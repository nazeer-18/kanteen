require('dotenv').config()
const express = require('express')
const verifyUser = express.Router()
const User = require('../models/User')
const userConnections = require('../utils')

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

verifyUser.get('/verify-mail', async (req, res) => {
    try {
        const { token,emailId } = req.query;
        if (!token) {
            return res.status(400).send({ message: "Token is required", success: false })
        }
        if(userConnections[emailId] && userConnections[emailId].token === token){
            userConnections[emailId].verified = true;
            userConnections[emailId].ws.send(JSON.stringify({message:"Email Verified",success:true,type:"verified"}));
            res.status(200).send({ message: "Email Verified, Redirecting to registeration page..", success: true })
        }
        else{
            res.status(400).send({ message: "Token Invalid", success: false })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error in verifying email", success: false })
    }
})

module.exports = verifyUser;