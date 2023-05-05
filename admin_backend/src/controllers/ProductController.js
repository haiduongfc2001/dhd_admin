const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Get a specific product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) throw new Error('Product not found');
        res.json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})

// Create a new product
app.post('/products', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.id,
        quantity: req.body.quantity
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Update a product
app.patch('/products/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true },
        );
        if (!product) throw new Error('Product not found');
        request.json(product);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.params.id });
        if (!product) throw new Error('Product not found');
        res.json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});