const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

require('dotenv').config(); // Add this line to load environment variables
const {HOST, PORT, USERNAME, PASSWORD} = require("../config/MailConfig");
const nodemailer = require("nodemailer");

const securePassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (err) {
        console.log(err.message);
    }
}

const sendResetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: HOST,
            port: PORT,
            secure: false, // upgrade later with STARTTLS
            requireTLS: true,
            auth: {
                user: USERNAME, // Use environment variable for email username
                pass: PASSWORD, // Use environment variable for email password
            },
        });

        const MailOptions = {
            from: USERNAME, // Use the same email username as the sender
            to: email,
            subject: 'For Reset Password',
            html: '<p>Hi ' + name + ', please click here to <a href="http://127.0.0.1:5000/admin/forget-password?token=' + token + '"> Reset </a> your password.</p>',
        }

        transporter.sendMail(MailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email has been sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};


const LoadLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const VerifyLogin = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email: email});

        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                if (userData.is_admin === 0) {
                    res.render('login', {message: 'Email and password is incorrect'});
                } else {
                    req.session.user_id = userData._id;
                    res.redirect('/admin/home');
                }
            } else {
                res.render('login', {message: 'Email and password is incorrect'});
            }

        } else {
            res.render('login', {message: 'Email and password is incorrect'})
        }

    } catch (error) {
        console.log(error.message);
    }
}

const LoadDashboard = async (req, res) => {
    try {
        const userData = await User.findById({_id: req.session.user_id})
        res.render('home', {admin: userData});
    } catch (error) {
        console.log(error.message);
    }
}

const Logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
    }
}

const ForgetLoad = async (req, res) => {
    try {
        res.render('forget');
    } catch (error) {
        console.log(error.message);
    }
}

const ForgetVerify = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({email: email});
        if (userData) {
            if (userData.is_admin === 0) {
                res.render('forget', {message: 'Email is incorrect'});
            } else {
                const randomString = randomstring.generate();
                const updatedData = await User.updateOne({email: email}, {$set: {token: randomString}});
                await sendResetPasswordMail(userData.name, userData.email, randomString);
                res.render('forget', {message: 'Please check your email to reset your password!'})
            }
        } else {
            res.render('forget', {message: 'Email is incorrect'});
        }

    } catch (error) {
        console.log(error.message);
    }
}

const ForgetPasswordLoad = async (req, res) => {
    try {

        const token = req.query.token;
        const tokenData = await User.findOne({token: token});

        if (tokenData) {
            res.render('forget-password', {user_id: tokenData._id})
        } else {
            res.render('404', {message: 'Invalid link!'})
        }

    } catch (error) {
        console.log(error.message)
    }
}

const ResetPassword = async (req, res) => {
    try {

        const password = req.body.password;
        const user_id = req.body.user_id;

        const secure_password = await securePassword(password);
        const updatedData = await User.findByIdAndUpdate({_id: user_id}, {$set: {password: secure_password, token: ''}});

        res.redirect('/admin');

    } catch (error) {
        console.log(error.message)
    }
}

const AdminDashboard = async (req, res) => {
    try {
        const userData = await User.find({is_admin: 0})
        res.render('dashboard', {users: userData})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    LoadLogin,
    VerifyLogin,
    LoadDashboard,
    Logout,
    ForgetLoad,
    ForgetVerify,
    ForgetPasswordLoad,
    ResetPassword,
    AdminDashboard
}