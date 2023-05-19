const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const express = require('express');

const nodemailer = require('nodemailer');
require('dotenv').config(); // Add this line to load environment variables
const MailConfig = require('../config/MailConfig');
const {HOST, PORT, USERNAME, PASSWORD} = require("../config/MailConfig");
const Product = require("../models/ProductModel");

const securePassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (err) {
        console.log(err.message);
    }
}

// For send mail
const sendVerifyMail = async (name, email, user_id) => {
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
            subject: 'For Verification Mail',
            text: "Plaintext version of the message",
            html: '<p>Hi ' +name+ ', please click here to <a href="http://127.0.0.1:5000/verify?id=' +user_id+ '"> Verify </a> your mail.</p>',
        }

        transporter.sendMail(MailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email has been sent: ' + info.response);
            }
        });

        // console.log("Message sent: %s", MailOptions.messageId);
        // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        //
        // // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(MailOptions));
        // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        console.log(error.message);
    }
};

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
};

const VerifyMail = async (req, res) => {
    try {
        const updateInfo = await User.updateOne({_id: req.query.id}, {$set: {is_verified: 1}});
        console.log(updateInfo);
        res.render('email-verified');
    } catch (err) {
        console.log(err.message);
    }
};

const AllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = {
    LoadRegister,
    AddUser,
    VerifyMail,
    AllUsers
}