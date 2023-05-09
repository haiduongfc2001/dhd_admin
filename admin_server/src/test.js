const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

// Allow cross-origin requests
app.use(cors());

app.use(bodyParser.json());

// -----------------------
const morgan = require('morgan');

// Use morgan to log HTTP requests
app.use(morgan('combined'));

// Load mongoose
const mongoose = require('mongoose');

require('./Product');
const Product = mongoose.model('Product')

// Connect
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/admin_database', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected - Products Service');
    } catch (error) {
        console.log('Data not connected!!!');
    }
}
connect();

// Get all products
app.get('/products', (req, res) => {
    Product.find().then((products) => {
        res.json(products);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Delete a product
app.delete('/product/:_id', (req, res) => {
    Product.findOneAndRemove(req.params.id).then(() => {
        res.send('Product deleted with success!');
        console.log('Product deleted', req.params.quantity);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});






