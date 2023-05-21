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

const AdminController = require('../controllers/AdminController')

admin_route.get('/', AdminController.LoadLogin);

admin_route.post('/', AdminController.VerifyLogin);

admin_route.get('/home', AdminController.LoadDashboard);

admin_route.get('*', (req, res) => {
    res.redirect('/admin');
})

module.exports = admin_route;