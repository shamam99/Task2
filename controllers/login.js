const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const User = require('../models/user');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid Credentials'); 
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new Error('Invalid Credentials');
        }
        res.json({
            status: true,
            message: "Login success",
            token: generateToken(user._id)
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { login };
