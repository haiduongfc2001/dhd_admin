const express = require('express');

const admin_route = express();

const session = require("express-session");
const SessionSecret = require('../config/SessionSecret')
admin_route.use(session({secret: SessionSecret.SESSION_SECRET}));

const bodyParser = require('body-parser');
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true}));

const path = require("path");
admin_route.set('view engine', 'ejs');
admin_route.set('views', path.join(__dirname, '../views/admin'));

const multer = require("multer");

// user_route.use(express.static('public'));
admin_route.use('/userImages', express.static('src/public/userImages'));

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

const AdminAuth = require('../middleware/AdminAuth')
const AdminController = require('../controllers/AdminController');

admin_route.use('/userImages', express.static('src/public/userImages'));

admin_route.get('/', AdminAuth.isLogout, AdminController.LoadLogin);

admin_route.post('/', AdminController.VerifyLogin);

admin_route.get('/home', AdminAuth.isLogin, AdminController.LoadDashboard);

admin_route.get('/logout', AdminAuth.isLogin, AdminController.Logout);

admin_route.get('/forget', AdminAuth.isLogout, AdminController.ForgetLoad);
admin_route.post('/forget', AdminController.ForgetVerify);

admin_route.get('/forget-password', AdminAuth.isLogout, AdminController.ForgetPasswordLoad);
admin_route.post('/forget-password', AdminController.ResetPassword);

admin_route.get('/dashboard', AdminAuth.isLogin, AdminController.AdminDashboard);

admin_route.get('/new-user', AdminAuth.isLogin, AdminController.NewUserLoad);
admin_route.post('/new-user', upload.single('image'),AdminController.AddUser);

admin_route.get('*', (req, res) => {
    res.redirect('/admin');
})

module.exports = admin_route;