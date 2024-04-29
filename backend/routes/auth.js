const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// authRouter.get('/', (req, res) => {
//     res.send("hello")
// })

//Login route
authRouter.post('/login', (req, res) => {

    res.send("login")
})

//Register route
authRouter.post('/signup', async (req, res) => {
    try {
        const { email, name, pwd, mobileNum, foodpref } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(pwd, salt);

        user = new User({
            emailId: email,
            name: name,
            mobileNumber: mobileNum,
            password: hashedPwd,
            foodPreference: foodpref
        })

        await user.save();
        res.status(201).json({ msg: "User Registered Successfully", success: true })

    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = authRouter;