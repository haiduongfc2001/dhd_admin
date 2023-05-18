const express = require("express");
const user_route = express();

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

user_route.get('/register', UserController.LoadRegister);

user_route.post('/register', upload.single('image'), UserController.AddUser);

user_route.get('/verify', UserController.VerifyMail)

module.exports = user_route;