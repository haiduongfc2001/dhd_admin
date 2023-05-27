const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const express = require('express');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

require('dotenv').config(); // Add this line to load environment variables
const {HOST, PORT, USERNAME, PASSWORD} = require("../config/MailConfig");
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
            html: '<p>Hi ' + name + ', please click here to <a href="http://127.0.0.1:5000/verify?id=' + user_id + '"> Verify </a> your mail.</p>',
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

// Gửi mail lấy lại mật khẩu đã quên
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
            html: '<p>Hi ' + name + ', please click here to <a href="http://127.0.0.1:5000/forget-password?token=' + token + '"> Reset </a> your password.</p>',
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

// Login user method
const LoginLoad = async (req, res) => {
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
                if (userData.is_verified === 0) {
                    res.render('login', {message: 'Please verify your mail!'});
                } else {
                    req.session.user_id = userData._id;
                    res.redirect('/home');
                }
            } else {
                res.render('login', {message: 'Email and passsword is incorrect'});
            }
        } else {
            res.render('login', {message: 'Email and passsword is incorrect'});
        }

    } catch (error) {
        console.log(error.message);
    }
}

const LoadHome = async (req, res) => {
    try {
        const userData = await User.findById({_id: req.session.user_id})
        res.render('home', {user: userData});
    } catch (error) {
        console.log(error.message)
    }
}

const UserLogout = async (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/');
    } catch (error) {
        console.log(error.message)
    }
}

// Forget Password
const ForgetLoad = async (req, res) => {
    try {
        res.render('forget');
    } catch (error) {
        console.log(error.message)
    }
}

// Forget Verify
const ForgetVerify = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({email: email});

        if (userData) {
            if (userData.is_verified === 0) {
                res.render('forget', {message: 'Xin check mail để xác thực đăng ký!'})
            } else {
                const randomString = randomstring.generate();
                const updatedData = await User.updateOne({email: email}, {$set: {token: randomString}});
                await sendResetPasswordMail(userData.name, userData.email, randomString);
                res.render('forget',
                    {message: 'Xin vui lòng check mail để reset lại mật khẩu!'}
                )
            }
        } else {
            res.render(
                'forget',
                {message: 'Email của bạn chưa được đăng ký! Xin đăng ký tài khoản!'}
            )
        }

    } catch (error) {
        console.log(error.message)
    }
}

const ForgetPasswordLoad = async (req, res) => {
    try {

        const token = req.query.token;
        const tokenData = await User.findOne({token: token})
        if (tokenData) {
            res.render('forget-password', {user_id: tokenData._id})
        } else {
            res.render('404', {message: 'Token không đúng'})
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
        const updatedData = await User.findByIdAndUpdate({_id: user_id}, {
            $set: {
                password: secure_password,
                token: ''
            }
        });

        res.redirect('/');

    } catch (error) {
        console.log(error.message);
    }
}

// For verification send mail link
const VerificationLoad = async (req, res) => {
    try {
        res.render('verification', {message: 'Verification'})
    } catch (error) {
        console.log(error.message);
    }
}

const SendVerificationLink = async (req, res) => {
    try {

        const email = req.body.email;
        const userData = await User.findOne({email: email});
        if (userData) {
            sendVerifyMail(userData.name, userData.email, userData._id);
            res.render('verification', {message: 'Reset verification mail sent your mail id, please check!'})
        } else {
            res.render('verification', {message: 'This email is not exist'})
        }

    } catch (error) {
        console.log(error.message);
    }
}

// User profile edit & update
const EditLoad = async (req, res) => {
    try {

        const id = req.query.id;
        const userData = await User.findById({_id: id});

        if (userData) {
            res.render('edit', {user: userData});
        } else {
            res.redirect('/home');
        }

    } catch (error) {
        console.log(error.message);
    }
}


const UpdateProfile = async (req, res) => {
    try {
        let updateData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const userData = await User.findByIdAndUpdate(
            {_id: req.body.user_id},
            {$set: updateData}
        );

        res.redirect('/home');
    } catch (error) {
        console.log(error.message);
    }
};

// const UpdateProfile = async (req, res) => {
//     try {
//
//         if (req.file) {
//             const userData = await User.findByIdAndUpdate({_id: req.body.user_id}, {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone, image: req.file.filename}})
//         } else {
//             const userData = await User.findByIdAndUpdate({_id: req.body.user_id}, {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}})
//         }
//
//         res.redirect('/home.ejs')
//
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// ----------------------------------------------------------------
// JSON - Connect to Client
const AllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.send(error.message);
    }
}

const FindUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params._id);

        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const UserRegister = async (req, res) => {
    try {

        // const {name, email, phone, password} = req.body;
        //
        // Kiểm tra xem người dùng đã tồn tại hay chưa
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) {
            return res.status(400).json({message: 'Tài khoản đã tồn tại. Xin vui lòng đăng nhập!'});
        } else {
            // Mã hóa mật khẩu trước khi lưu vào csdl
            const hashedPassword = await securePassword(req.body.password);

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                image: req.file.filename,
                password: hashedPassword,
                is_admin: 0,
            });

            // Lưu user vào csdl
            const userData = await user.save();
            res.json(userData);
        }

    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
}


module.exports = {
    LoadRegister,
    VerifyMail,
    AllUsers,
    LoginLoad,
    VerifyLogin,
    LoadHome,
    UserLogout,
    ForgetLoad,
    ForgetVerify,
    ForgetPasswordLoad,
    ResetPassword,
    VerificationLoad,
    SendVerificationLink,
    EditLoad,
    UpdateProfile,
    //----------------------------
    AddUser,
    FindUserById,
    UserRegister
}