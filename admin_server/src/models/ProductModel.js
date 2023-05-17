const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true,
        // minLength: 1
    },
    quantity: {
        type: Number,
        required: true,
        // minLength: 1
    },
})

module.exports = mongoose.model('Product', Product);
