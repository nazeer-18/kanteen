require('dotenv').config()
const port = process.env.port || 8080

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())

const connectDB = require('./db')
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`)
    })
}).catch(err => {
    console.log(err)
    console.error("DB connection failed")
})

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

const verifyRouter = require('./routes/verify')
app.use('/api/verify', verifyRouter)