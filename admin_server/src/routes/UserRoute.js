const express = require("express");
const user_route = express();
const session = require("express-session");

const SessionSecret = require('../config/SessionSecret')
user_route.use(session({secret: SessionSecret.SESSION_SECRET}));

const auth = require('../middleware/auth')

const UserController = require("../controllers/UserController");
const path = require("path");

user_route.set('view engine', 'ejs');
user_route.set('views', path.join(__dirname, '../views/users'));

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, '../public/userImages'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})
const upload = multer({storage: storage})

user_route.get('/register', auth.isLogout, UserController.LoadRegister);

user_route.post('/register', upload.single('image'), UserController.AddUser);

user_route.get('/verify', UserController.VerifyMail);

user_route.get('/', auth.isLogout, UserController.LoginLoad);
user_route.get('/login', auth.isLogout, UserController.LoginLoad);

user_route.post('/login', UserController.VerifyLogin);

user_route.get('/home', auth.isLogin, UserController.LoadHome);

user_route.get('/logout', auth.isLogin, UserController.UserLogout);

// axios
user_route.get('/users', UserController.AllUsers);

module.exports = user_route;