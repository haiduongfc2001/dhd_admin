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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

app.post("/admin/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    if (email !== admin.email) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    bcrypt.compare(password, admin.password, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(bcrypt.hashSync(password, 10));
        if (result) {
            const token = "Bearer " + jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            })
            return res
                .status(200)
                .header("Authorization", token)
                .json({ message: "Login successful"});
        } else {
            return  res.status(401).json({ message: "Invalid email or password" });
        }
    });

});

app.post('/admin/logout', (req, res) => {
    //
})






