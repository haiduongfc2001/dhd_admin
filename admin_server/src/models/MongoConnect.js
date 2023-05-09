// Load mongoose
const mongoose = require('mongoose');

require('./ProductsModel');
const {hashSync} = require("bcrypt");
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

module.exports = connect;