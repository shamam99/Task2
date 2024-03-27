const User = require('../models/user');
const crypto = require('crypto');
const sendEmail = require('../utils/mailer')

const forgetPass = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404; 
            throw error; 
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; 
        await user.save();
        const resetLink = `http://localhost:3000/auth/resetPassword/${resetToken}`;
        await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: `This is a plain text fallback for email clients that do not render HTML`,
            html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                   <p>Please click on the following link, or paste this into your browser to complete the process within the next 10 minutes:</p>
                   <a href="${resetLink}">${resetLink}</a>
                   <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
        });

        res.status(200).json({ msg: 'Email sent. Please check your inbox.' });
    } catch (err) {
        next(err); 
    }
};

module.exports = { forgetPass };
