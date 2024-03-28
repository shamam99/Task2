const crypto = require('crypto');
const User = require('../models/user.js');

const resetPass = async (req, res, next) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
    try {
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
  
        if (!user) {
            return res.status(400).json({ msg: 'Token is invalid or has expired.' });
        }
  
        user.password = newPassword;
        user.resetPasswordToken = undefined; 
        user.resetPasswordExpire = undefined; 
        await user.save(); 
  
        res.status(200).json({ msg: 'Password has been updated.' });
    } catch (err) {
        next(err);
    }
  };

module.exports = { resetPass };
