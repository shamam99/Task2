const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Read Users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        next(err); 
    }
};

// Admin Create User
exports.createUser = async (req, res, next) => {
    const { username, email, password, isAdmin } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }
        
        user = new User({
            username,
            email,
            password, 
            isAdmin
        });
        
        await user.save();
        
        res.status(201).json({ msg: 'User created successfully' });
    } catch (err) {
        next(err);
    }
};

// Admin Read User
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); 
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

// Admin Update User
exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updateFields = req.body;

    if (updateFields.password) {
        const error = new Error('Please use the dedicated endpoint for password updates.');
        error.statusCode = 400;
        return next(error);
    }

    try {
        const user = await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.json({ msg: 'User updated successfully', user });
    } catch (err) {
        next(err);
    }
};

// Admin Update User Password
exports.updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404; 
            throw error;
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            const error = new Error('Current password is incorrect');
            error.statusCode = 400; 
            throw error;
        }
        if (newPassword.length < 8 || newPassword.length > 24) {
            const error = new Error('New password must be 8-24 characters long');
            error.statusCode = 400; 
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        next(err); 
    }
};

// Admin Delete User
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
};
