const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_admin: {
        type: Number,
        required: true,
    },
    is_verified: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', User);