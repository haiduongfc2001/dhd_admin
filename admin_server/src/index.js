// const express = require('express')
// const morgan = require('morgan')
// const app = express()
// const port = 4000

// app.use(morgan('combined'))

// app.get('/', (req, res) => {
//     res.render('Home');
// })

// app.get('/products', (req, res) => {
//     res.render('Products');
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// Load express
const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

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

// Call connect function
// connect().then((err) => {
//     if (err) {
//         throw err;
//     }
// });
connect();

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
    password: "$2b$10$yGQlIh/Xz8v3q0rUfcYTKOAHrRfNRhOL0h27i5/5yL1rn8z29xjKm" // hashed password: admin123
};

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if admin email is valid
    if (email !== admin.email) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if admin password is valid
    bcrypt.compare(password, admin.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate and send JWT token
        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
        return res.json({ message: "Login successful", token });
    });
});

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // Array of admin credentials
// const admins = [
//     { email: 'admin1@example.com', password: 'admin123' },
//     { email: 'admin2@example.com', password: 'password123' },
// ];
//
// // Route for admin login
// app.post('/admin/signin', (req, res) => {
//     const { email, password } = req.body;
//
//     // Check if the email and password match any of the admin credentials
//     const isAdmin = admins.some(
//         admin => admin.email === email && admin.password === password
//     );
//
//     if (isAdmin) {
//         res.status(200).json({ message: 'Login successful' });
//     } else {
//         res.status(401).json({ message: 'Invalid email or password' });
//     }
// });

app.listen(5000, () => {
    console.log('Up to running! -- This is our Products service');
});






