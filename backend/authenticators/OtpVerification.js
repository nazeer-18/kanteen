const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.MAIL_PASSWORD
    },
});

const serverUrl = process.env.SERVER_URL;

const sendOtpVerificationMail = (emailId,otp,name) => {
        const mailContent = {
        from: process.env.ADMIN_MAIL,
        to: emailId,
        subject: 'Otp to reset your password',
        html: `
        <div style="background: url('https://dt19wmazj2dns.cloudfront.net/wp-content/uploads/2019/06/Banner-1384-chennai.jpg') no-repeat center center / cover; background-color: #bf0c45; padding: 50px; text-align: center; color: white; height: 400px; display: flex; align-items: center; justify-content: center;">
        <div style="max-width: 1000px; width: 100%; margin: 0 auto; background: rgba(0, 0, 0, 0.7); padding: 50px; box-sizing: border-box;">
            <p style="font-size: 16px; line-height: 1.5; font-family: 'Petrona', serif;">
                Hi <strong>${name.toUpperCase()}</strong>,<br><br>
                <p>We’ve received a request to reset the Kanteen Account password for the email address ${emailId}.</p> <br>

                <p>To change your password,</p>
            <h2>Here is your Otp to reset your password</h2>
            </p>
            <h1>${otp}</h1>
            <p style="font-size: 16px; line-height: 1.5; font-family: 'Petrona', serif; margin-top: 10px;">
                Please <strong>Do not share</strong> this otp with anyone:
            </p>
            Thanks,<br>
                Team <strong>Kanteen-Ase-Chennai</strong>
            </p>
        </div>
    </div>
        `
    };

    transporter.sendMail(mailContent, (error, info) => {
        if (error) {
            console.log('Error occurred while sending mail');
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendOtpVerificationMail;
