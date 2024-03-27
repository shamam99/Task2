const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    tripleName: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return (/^[\u0600-\u06FFa-zA-Z\s]{4,}$/).test(v);
            },
            message: props => `${props.value} must be in Arabic or English, at least 4 letters, and does not contain numbers.`
        }
    },
    username: {
        type: String,
        required: true,
        minlength: [8, 'Username must be at least 8 characters long'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z]*[a-z]+[a-zA-Z]*$/.test(v);
            },
            message: props => `${props.value} must contain only alphabetical letters, at least one lowercase, and no special characters or spaces.`
        },
        unique: true, 
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid email format']
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/.test(v);
            },
            message: () => `Password must be 8-24 characters long, contain at least one uppercase letter, one lowercase letter, and one special character. Spaces are prohibited.`
        },
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
