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

        });
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
        const { emailId, name, mobileNumber, password } = req.body;
        const user = await User.findOne({
            $or: [{ emailId: emailId }, { mobileNumber: mobileNumber }]
        })
        if (user) {
            return res.status(400).send({ message: "The mobile number you entered is already associated with an account. Please sign in or recover your account if you've forgotten your password. ", success: false })
        }
        const salt = await bcrypt.genSalt(10);
        const Hashedpassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            emailId: emailId,
            name: name,
            mobileNumber: mobileNumber,
            password: Hashedpassword,
        })

        await newUser.save();
        res.status(201).json({ msg: "User Registered Successfully", success: true })

    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = authRouter;