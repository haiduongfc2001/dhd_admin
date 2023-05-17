const express = require('express');
const productRoute = express();

const ProductController = require('../controllers/ProductController');
const path = require("path");

const bodyParser = require('body-parser');
productRoute.use(bodyParser.json());
productRoute.use(bodyParser.urlencoded({ extended: true }));

productRoute.set('view engine', 'pug');
productRoute.set('views', path.join(__dirname, '../views'))

productRoute.get('/products', (req, res) => {
    res.render('AddProduct')
})

productRoute.post('/products', ProductController.AddProduct);

module.exports = productRoute;