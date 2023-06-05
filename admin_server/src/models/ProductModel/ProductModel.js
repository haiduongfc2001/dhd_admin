const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true,
        // minLength: 1
    },
    supplierID: {   // nha san xuat
        type: Schema.Types.ObjectId,
        ref: 'Supplier', // Tên của model Supplier liên quan
        required: true,
    },
    category: {
      type: String,
      required: true,
    },
    // categoryID: {   // loai san pham
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category', // Tên của model Supplier liên quan
    //     required: true,
    // },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Product', Product);
