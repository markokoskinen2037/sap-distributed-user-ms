const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
        next();
    } else {
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.username);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
})

module.exports = mongoose.model('User', userSchema)