const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const User = require('../models/user');

const register = async (req, res, next) => {
    const { tripleName, username, email, password, isAdmin } = req.body; 
    try {
        let user = await User.findOne({ email });
        if (user) {
            throw new Error('User already exists'); 
        }

        user = new User({
            tripleName,
            username,
            email,
            password,
            isAdmin 
        });

        await user.save();

        res.json({
            token: generateToken(user._id),
            user: {
                id: user._id,
                tripleName: user.tripleName,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (err) {
        next(err);
    }
};
module.exports = { register };
