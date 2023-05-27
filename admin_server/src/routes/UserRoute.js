const express = require("express");
const user_route = express();

const session = require("express-session");
const SessionSecret = require('../config/SessionSecret');
user_route.use(session({
    secret: SessionSecret.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

const Auth = require('../middleware/Auth');
const User = require("../models/UserModel");

const UserController = require("../controllers/UserController");
const AdminController = require("../controllers/AdminController");

const path = require("path");
user_route.set('view engine', 'ejs');
user_route.set('views', path.join(__dirname, '../views/users'));

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
user_route.use('/userImages', express.static('src/public/userImages'));

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, '../public/userImages'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})
const upload = multer({storage: storage});

// user_route.get('/register', Auth.isLogout, UserController.LoadRegister);
// user_route.post('/register', upload.single('image'), UserController.AddUser);
//
// user_route.get('/verify', UserController.VerifyMail);
//
// user_route.get('/', Auth.isLogout, UserController.LoginLoad);
//
// user_route.get('/login', Auth.isLogout, UserController.LoginLoad);
// user_route.post('/login', UserController.VerifyLogin);
//
// user_route.get('/home', Auth.isLogin, UserController.LoadHome);
//
// user_route.get('/logout', Auth.isLogin, UserController.UserLogout);
//
// user_route.get('/forget', Auth.isLogout, UserController.ForgetLoad);
// user_route.post('/forget', UserController.ForgetVerify);
//
// user_route.get('/forget-password', Auth.isLogout, UserController.ForgetPasswordLoad);
// user_route.post('/forget-password', UserController.ResetPassword);
//
// user_route.get('/verification', UserController.VerificationLoad);
// user_route.post('/verification', UserController.SendVerificationLink);
//
// user_route.get('/edit', Auth.isLogin, UserController.EditLoad);
// user_route.post('/edit', upload.single('image'), UserController.UpdateProfile);


// axios
user_route.get('/users', UserController.AllUsers);
user_route.get('/user/:_id', UserController.FindUserById);
user_route.put('/user/:_id', upload.single('image'), AdminController.AdminEditUser)
user_route.delete('/user/:_id', AdminController.AdminDeleteUser);
user_route.post('/user', upload.single('image'), UserController.UserRegister);

module.exports = user_route;

// const AddUser = async (req, res) => {
//     try {
//         const spassword = await securePassword(req.body.password)
//
//         const user = new User({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             image: req.file.filename,
//             password: spassword,
//             is_admin: 0,
//         });
//
//         const userData = await user.save();
//
//         if (userData) {
//             await sendVerifyMail(req.body.name, req.body.email, userData._id);
//             res.render('registration', {message: 'Your registration has been successfully! Please check your email!'});
//         } else {
//             res.render('registration', {message: 'Your registration has been failed!'});
//         }
//
//     } catch (err) {
//         res.send(err.message);
//     }
// };

// const AdminAddUser = async (req, res) => {
//     try {
//         const name = req.body.name;
//         const email = req.body.email;
//         const phone = req.body.phone;
//         const image = req.file.filename;
//         const password = randomstring.generate(8);
//
//         const hashedPassword = await securePassword(password);
//
//         const user = new User({
//             name: name,
//             email: email,
//             phone: phone,
//             image: image,
//             password: hashedPassword,
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
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// }