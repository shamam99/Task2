const nodemailer = require('nodemailer');
const stubTransport = require('nodemailer-stub-transport');

async function sendEmail({ to, subject, text }) {
    const transporter = nodemailer.createTransport(stubTransport({
    }));

    const mailOptions = {
        from: '"Test Sender" <sender@example.com>',
        to: to, 
        subject: subject, 
        text: text, 
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email successfully sent:", info.response.toString());
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendEmail;
