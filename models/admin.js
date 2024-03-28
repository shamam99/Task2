const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
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
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isAdmin: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

adminSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

module.exports = mongoose.model('admin', adminSchema);
