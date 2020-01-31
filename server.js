require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require("./routes/users")
const morgan = require('morgan');
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


app.use(morgan('dev'));



// ROUTES:
app.use("/users", userRouter)





// If no match, use this:
app.use("/", (req, res) => res.send("User microservice"))

const port = process.env.PORT || 3002
app.listen(port, () => console.log('server started on port', port))