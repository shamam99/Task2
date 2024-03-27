const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res, next) => {
    const { username, email, password, tripleName, isAdmin } = req.body; 
    try {
        let user = await User.findOne({ email });
        if (user) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }
        user = new User({
            tripleName,
            username,
            email,
            password,
            isAdmin 
        });

        await user.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user.id,
                tripleName: user.tripleName,
                username: user.username,
                email: user.email,
                isAdmin :user.isAdmin
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { register };
