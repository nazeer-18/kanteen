const express = require('express')
const verifyUser = express.Router()
const User = require('../models/User')

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

module.exports = verifyUser;