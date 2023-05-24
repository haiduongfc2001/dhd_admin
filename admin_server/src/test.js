// const User = require('../models/UserModel');
// const bcrypt = require('bcrypt');
// const randomstring = require('randomstring');
// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
//
// require('dotenv').config();
// const {HOST, PORT, USERNAME, PASSWORD} = require("../config/MailConfig");
//
// const securePassword = async (password) => {
//     try {
//         return await bcrypt.hash(password, 10);
//     } catch (err) {
//         console.log(err.message);
//     }
// }
//
// // For send mail
// const addUserMail = async (name, email, password, user_id) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: HOST,
//             port: PORT,
//             secure: false, // upgrade later with STARTTLS
//             requireTLS: true,
//             auth: {
//                 user: USERNAME, // Use environment variable for email username
//                 pass: PASSWORD, // Use environment variable for email password
//             },
//         });
//
//         const MailOptions = {
//             from: USERNAME, // Use the same email username as the sender
//             to: email,
//             subject: 'Admin add you and verify your email',
//             html: '<p>Hi ' + name + ', please click here to <a href="http://127.0.0.1:5000/verify?id=' + user_id + '"> Verify </a> your mail.</p>' +
//                 '<br><br>' +
//                 '<b>Email: ' + email + '</b>' +
//                 '<br>' +
//                 '<b>Password: ' + password + '</b>',
//         }
//
//         transporter.sendMail(MailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email has been sent: ' + info.response);
//             }
//         });
//
//     } catch (error) {
//         console.log(error.message);
//     }
// };
//
// const AdminAddUser = async (req, res) => {
//     try {
//         const name = req.body.name;
//         const email = req.body.email;
//         const phone = req.body.phone;
//         const image = req.file.filename;
//         const password = randomstring.generate(8);
//
//         const spassword = await securePassword(password);
//
//         const user = new User({
//             name: name,
//             email: email,
//             phone: phone,
//             image: image,
//             password: spassword,
//             is_admin: 0,
//         });
//
//         const userData = await user.save();
//
//         if (userData) {
//             await addUserMail(name, email, password, userData._id);
//             res.status(200).json({message: 'Add User Successfully!'})
//         }
//
//         res.json(userData);
//
//     } catch (error) {
//         res.send(error.message);
//     }
// }
//
// module.exports = {
//     AdminAddUser
//
// }