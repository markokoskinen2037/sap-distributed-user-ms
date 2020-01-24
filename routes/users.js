const express = require('express')
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




router.post('/register', async (req, res) => {

    const { username, password } = req.body


    const user = new User({
        username: username,
        password: password
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})


router.post('/login', (req, res) => {

    const { username, password } = req.body

    let result = {};
    let status = 200;
    User.findOne({ username }, (err, user) => {
        if (!err && user) {
            // We could compare passwords in our model instead of below
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    result.status = status;

                    status = 200;
                    // Create a token
                    const payload = { user: user };
                    const options = { expiresIn: '2d', issuer: 'sap-todo' };
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, options);

                    // console.log('TOKEN', token);
                    result.token = token;
                    result.status = status;
                    result.username = username;
                } else {
                    status = 401;
                    result.status = status;
                    result.error = 'Authentication error';
                }
                res.status(status).send(result);
            }).catch(err => {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            });
        } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });



})

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




module.exports = router


