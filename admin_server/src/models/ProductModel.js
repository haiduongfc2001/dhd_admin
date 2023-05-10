// const mongoose = require('mongoose');
//
// mongoose.model('Product', {
//     // name, quantity
//     name: {
//         type: 'String',
//         require: true,
//     },
//     quantity: {
//         type: 'Number',
//         require: true,
//     },
// })
//

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, minLength: 1 },
    quantity: { type: Number, minLength: 1 },
})

module.exports = mongoose.model('Product', Product);
