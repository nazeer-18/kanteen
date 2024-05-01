require('dotenv').config()
const express = require('express')
const verifyUser = express.Router()
const User = require('../models/User')
const sendVerificationMail = require('../authenticators/MailVerificator')

verifyUser.post('/mail', async (req, res) => {
    try {
        const { emailId } = req.body;
        const existingUser = await User.findOne({ emailId: emailId });
        if (existingUser) {
            return res.status(409).json({ message: "Oops! It looks like that email address is already registered. Please use a different email to sign up.", success: false });
        }
        else {
            res.status(202).json({ message: "Email is valid and available for registeration. Proceeding with Verification...", success: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

verifyUser.post('/verify-mail', async (req, res) => {
    try {
        const userEmail = req.body.emailId;
        if (!userEmail) {
            return res.status(400).send({ message: "Email Address is required", success: false })
        }
        sendVerificationMail(userEmail);
        const decoded = jwt.verify(token, process.env.VERIFICATION_SECRET);
        res.status(200).send({ message: "Verification successful", success: true, email: decoded.email })
    } catch (error) {
        res.status(400).send({ message: "Token Invalid", success: false })
    }
})

module.exports = verifyUser;