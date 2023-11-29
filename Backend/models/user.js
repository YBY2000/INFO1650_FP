const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    user_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
    },
    account: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email address'
        }
    },
    passcode: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
            },
            message: 'Password is too weak',
        }
    },
    user_name: {
        type: String,
        validate: {
            validator: (value) => /^[a-zA-Z ]{1,50}$/.test(value),
            message: 'Invalid full name format',
        },
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
})

const User = mongoose.model('users', userSchema);

module.exports = User;