// Load express
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const route = require('./routes');
const db = require('./config/db');

// Connect to db
db.connect();

require("dotenv").config();

// Allow cross-origin requests
app.use(cors());

app.use(bodyParser.json());

// -----------------------
const morgan = require('morgan');

// Use morgan to log HTTP requests
app.use(morgan('combined'));



require('./models/ProductModel');
const {hashSync} = require("bcrypt");
const Product = mongoose.model('Product')

app.get('/', (req, res) => {
    res.send('This is a products service');
})

// Add a new product
app.post('/product', async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const product = new Product({
            name,
            quantity
        });
        await product.save();
        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// Edit a product
app.put('/product/:id', (req, res) => {
    const { name, quantity } = req.body;
    const productId = req.params.id;

    Product.findByIdAndUpdate(productId, { name, quantity })
        .then(() => res.status(200).send('Product edited successfully'))
        .catch((err) => res.status(500).send(err.message));
});


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

// Find product by id
app.get('/product/:_id', (req, res) => {
    Product.findById(req.params._id).then((product) => {
        if (product) {
            //Product data
            res.json(product);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Delete a product
app.delete('/product/:_id', (req, res) => {
    Product.findOneAndRemove({_id: req.params._id}).then((product) => {
        if (product) {
            res.send(`Product ${req.params._id} deleted successfully!`);
        } else {
            res.send(`Product ${req.params._id} not found!`);
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error deleting product');
    });
});

// Create a mock admin account
const admin = {
    id: 1,
    email: "admin@example.com",
    password: "$2b$10$JDj8276zry8i3YKRvIV3GOKLaBJFlnv/bdkwMsw1S.i1Slkhv.Jrm" // hashed password: admin123
};

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Login route
app.post("/admin/signin", (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if admin email is valid
    if (email !== admin.email) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // console.log("Email and password", admin.email, hashSync(password, 10));
    // Check if admin password is valid
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
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            // JWT token is valid, clear it from the client-side cookie
            res.clearCookie('jwt');
            // Send a response indicating successful logout
            return res.status(200).json({ message: "Logout successful" });
        });
    } else {
        // Authorization header is missing, return a 401 Unauthorized response
        return res.sendStatus(401);
    }
});


route(app);

app.listen(5000, () => {
    console.log('Up to running! -- This is our Products service');
});














