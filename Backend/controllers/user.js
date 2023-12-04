const User = require('../models/user');
const mongoose = require('mongoose');

exports.createUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, gender, country, description, avatar, age, interest } = req.body;
        const user = new User({
            userId: new mongoose.Types.ObjectId(),
            email,
            password,
            fullName: firstName + ' ' + lastName,
            gender,
            country,
            description,
            avatar,
            age,
            interest,
            userType: 0, // 0 -- normal user, 1 -- admin
        });
        await user.save();
        res.success({ user }, 'User created successfully');
    } catch (error) {
        res.error(400, error.message);
    }
};

exports.editUser = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.error(404, 'User not found');
        }
        if (fullName) {
            if (!/^[a-zA-Z ]{1,50}$/.test(fullName)) {
                return res.error(400, 'Invalid full name format');
            }
            user.fullName = fullName;
        }
        if (password) {
            // Validate password (customize the validation as needed)
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
                return res.error(400, 'Invalid password format');
            }
            user.password = password;
        }
        await user.save();
        res.success({ user }, 'User details updated successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.error(404, 'User not found');
        }
        await user.deleteOne();
        res.success({ user }, 'User deleted successfully');
    } catch (error) {
        res.error(500, error.message);
    }
};

exports.getUsersByFilter = async (req, res) => {
    try {
        let query = {};
        if (req.body.email) {
            query.email = new RegExp(req.body.email, 'i'); // 模糊匹配 email
        }
        if (req.body.fullName) {
            query.fullName = new RegExp(req.body.fullName, 'i'); // 模糊匹配 fullName
        }
        if (req.body.gender !== undefined && req.body.gender !== null && req.body.gender !== '') {
            query.gender = req.body.gender;
        }
        if (req.body.country !== undefined && req.body.country !== null && req.body.country !== '') {
            query.country = req.body.country;
        }
        if (req.body.userType !== undefined && req.body.userType !== null && req.body.userType !== '') {
            query.userType = req.body.userType;

        }
        if (req.body.minAge) {
            query.age = { $gte: req.body.minAge };
        }
        if (req.body.maxAge) {
            query.age = query.age ? { ...query.age, $lte: req.body.maxAge } : { $lte: req.body.maxAge };
        }

        const users = await User.find(query, '-_id');

        res.success({ users, total: users.length }, 'Users retrieved successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};


module.exports = exports;
