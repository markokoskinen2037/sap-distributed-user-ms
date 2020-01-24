require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require("./routes/users")

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

// ROUTES:
app.use("/", (req, res) => res.send("User microservice"))
app.use("/users", userRouter)


app.listen(process.env.PORT || 3000, () => console.log('server started'))