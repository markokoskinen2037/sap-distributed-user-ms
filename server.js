require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require("./routes/users")
const logger = require('morgan');
const bodyParser = require('body-parser');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


const environment = process.env.NODE_ENV; // development



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())

if (environment !== 'production') {
    app.use(logger('dev'));
}


// ROUTES:
app.use("/users", userRouter)





// If no match, use this:
app.use("/", (req, res) => res.send("User microservice"))


app.listen(process.env.PORT || 3000, () => console.log('server started'))