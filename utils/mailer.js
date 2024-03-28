const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text, html }) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:  'shamam.kafri@gmail.com',
            pass: 'ohsh rbsv zfin mikh '
        } 
});

const mailOptions = {
    from: '"shamam" <shamam.kafri@gmail.com>', 
    to: to, 
    subject: subject, 
    text: text, 
    html: html 
};

try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email successfully sent:", info.messageId);
} catch (error) {
    console.error("Error sending email:", error);
    throw error; 
}
}

module.exports = sendEmail;
