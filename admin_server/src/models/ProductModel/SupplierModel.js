const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Supplier = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Supplier', Supplier);