const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const securePassword = async(password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (err) {
        console.log(err.message);
    }
}

const LoadRegister = async(req, res) => {
    try {
        res.render('registration');
    } catch (err) {
        console.log(err.message);
    }
}

const AddUser = async(req, res) => {
    try {
        const spassword = await securePassword(req.body.password)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
            password: spassword,
            is_admin: 0,
        });

        const userData = await user.save();

        if(userData) {
            res.render('registration', {message: 'Your registration has been successfully!'});
        } else {
            res.render('registration', {message: 'Your registration has been failed!'});
        }

    } catch (err) {
        res.send(err.message);
    }
}

module.exports = {
    LoadRegister,
    AddUser,
}