const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

authRouter.get('/', (req, res) => {
    res.send("Auth route")
}
)

//Login route
authRouter.post('/login', async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({
            $or: [{ emailId: userId }, { mobileNumber: userId }]
        })
        if (!user) {
            return res.status(404).send({ message: "The credentials provided do not match our records. Please verify your details and try again.", success: false })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid Credentials", success: false })
        }

        res.status(200).send({ message: "Login Successful!..Redirecting to home page..", success: true })

    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
    }
})

//Register route
authRouter.post('/signup', async (req, res) => {
    try {
        const { email, name, pwd, mobileNum } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(pwd, salt);

        user = new User({
            emailId: email,
            name: name,
            mobileNumber: mobileNum,
            password: hashedPwd,
        })

        await user.save();
        res.status(201).json({ msg: "User Registered Successfully", success: true })

    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = authRouter;