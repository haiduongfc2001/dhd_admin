const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

require('dotenv').config(); // Add this line to load environment variables
const {HOST, PORT, USERNAME, PASSWORD} = require("../config/MailConfig");

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

// For send mail
const addUserMail = async (name, email, password, user_id) => {
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
            subject: 'Admin add you and verify your email',
            html: '<p>Hi ' + name + ', please click here to <a href="http://127.0.0.1:5000/verify?id=' + user_id + '"> Verify </a> your mail.</p>' +
                '<br><br>' +
                '<b>Email: ' + email + '</b>' +
                '<br>' +
                '<b>Password: ' + password + '</b>',
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
        const updatedData = await User.findByIdAndUpdate({_id: user_id}, {
            $set: {
                password: secure_password,
                token: ''
            }
        });

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

const NewUserLoad = async (req, res) => {
    try {
        res.render('new-user');
    } catch (error) {
        console.log(error.message);
    }
}

const AddUser = async (req, res) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const image = req.file.filename;
        const password = randomstring.generate(8);

        const spassword = await securePassword(password);

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            image: image,
            password: spassword,
            is_admin: 0,
        })

        const userData = await user.save();

        if (userData) {
            await addUserMail(name, email, password, userData._id);
            res.redirect('/admin/dashboard');
        } else {
            res.render('new-user', {message: 'Something went wrong!'})
        }

    } catch (error) {
        console.log(error.message);
    }
}

// edit user functionality
const EditUserLoad = async (req, res) => {
    try {
        const id = req.query.id;
        const userData = await User.findById({_id: id});

        if (userData) {
            res.render('edit-user', {user: userData});
        } else {
            res.redirect('/admin/dashboard');
        }
    } catch (error) {
        console.log(error.message);
    }
}

const UpdateUser = async (req, res) => {
    try {

        const userData = await User.findByIdAndUpdate({_id: req.body.id}, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                is_verified: req.body.verify
            }
        })

        res.redirect('/admin/dashboard');

    } catch (error) {
        console.log(error.message);
    }
}


// Delete User
const DeleteUser = async (req, res) => {
    try {

        const id = req.query.id;
        await User.deleteOne({_id: id});
        res.redirect('/admin/dashboard');

    } catch (error) {
        console.log(error.message);
    }
}

// ----------------------------------------------------------------
//  JSON - Connect to Client
const AllAdmins = async (req, res) => {
    try {
        const users = await User.find({is_admin: 1})
        res.json(users);
    } catch (error) {
        res.send(error.message);
    }
}

const AdminLogin = async (req, res) => {
    const {email, password} = req.body;

    try {

        // // Tìm kiếm admin dựa trên email
        const admin = await User.findOne({email});

        // If admin doesn't exist, return an error
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, admin.password);

        // If passwords don't match, return an error
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET );

        // Lưu thông tin người dùng trong session
        req.session.adminId = admin._id;

        res.json({ token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const AdminLogout = async (req, res) => {
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.error('Logout failed:', err);
    //         res.status(500).json({ message: 'Logout failed' });
    //     } else {
    //         res.json({ message: 'Logged out successfully' });
    //     }
    // });

    const {token} = req.body;

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Invalid token'});
        }

        // Perform any necessary logout logic (e.g., removing tokens from the database, etc.)

        // Return a success message
        res.status(200).json({message: 'Logged out successfully'});
    });
};

module.exports = {
    LoadLogin,
    VerifyLogin,
    LoadDashboard,
    Logout,
    ForgetLoad,
    ForgetVerify,
    ForgetPasswordLoad,
    ResetPassword,
    AdminDashboard,
    NewUserLoad,
    AddUser,
    EditUserLoad,
    UpdateUser,
    DeleteUser,
// JSON - Connect to Client
    AllAdmins,
    AdminLogin,
    AdminLogout,

}