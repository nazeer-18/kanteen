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

const sendVerificationMail = (emailId,token) => {
    const verificationLink = `${serverUrl}/api/verify/verify-mail/?token=${token}&emailId=${emailId}`;

    const mailContent = {
        from: process.env.ADMIN_MAIL,
        to: emailId,
        subject: 'Verify Your Email @ Kanteen-ASE Chennai',
        html: `
        <div style="background: url('https://dt19wmazj2dns.cloudfront.net/wp-content/uploads/2019/06/Banner-1384-chennai.jpg') no-repeat center center / cover; background-color: #bf0c45; padding: 50px; text-align: center; color: white; height: 400px; display: flex; align-items: center; justify-content: center;">
        <div style="max-width: 1000px; width: 100%; margin: 0 auto; background: rgba(0, 0, 0, 0.7); padding: 50px; box-sizing: border-box;">
            <h1 style="font-weight: bold; font-family: 'Petrona', serif;">Welcome to Kanteen Ase Chennai!</h1>
            <p style="font-size: 16px; line-height: 1.5; font-family: 'Petrona', serif;">
                Hi user,<br><br>
                Thank you for <strong>registering</strong> with us!
            </p>
            <p style="font-size: 16px; line-height: 1.5; font-family: 'Petrona', serif; margin-top: 10px;">
                Please <strong>verify your email</strong> by clicking on the link below:
            </p>
            <a href="${verificationLink}" style="display: inline-block; margin-top: 15px; padding: 10px 10px; background-color: #f0ad4e; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-family: 'Petrona', serif;">Verify Email</a>
            <p style="font-size: 16px; line-height: 1.5; font-family: 'Petrona', serif; margin-top: 10px;">
                This link will <strong>expire in one hour</strong>. We don't want to miss you!
            </p>
            <p style="font-size: 16px; line-height: 1.5; font-family: 'Petrona', serif; margin-top: 5px;">
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

module.exports = sendVerificationMail;
