const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            const error = new Error('Invalid Credentials');
            error.statusCode = 400;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid Credentials');
            error.statusCode = 400;
            throw error;
        }

        const payload = { user: { id: user.id }};
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {httpOnly: true, maxAge: 360000});
            return res.json({status: true, message:"login success", token: token});
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { login };
