const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const express = require('express');

const nodemailer = require('nodemailer');
require('dotenv/config'); // Add this line to load environment variables
const MailConfig = require('../config/MailConfig');
const {HOST, PORT, USERNAME, PASSWORD} = require("../config/MailConfig");

// For send mail
const sendVerifyMail = async (name, email, user_id) => {
    try {

    } catch (error) {
        console.log(error.message);
    }
}

const LoadRegister = async (req, res) => {
    try {
        res.render('registration');
    } catch (err) {
        console.log(err.message);
    }
}

const AddUser = async (req, res) => {
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
        if (userData) {
            await sendVerifyMail(req.body.name, req.body.email, userData._id);
            res.render('registration', {message: 'Your registration has been successfully! Please check your email!'});
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