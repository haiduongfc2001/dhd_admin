const mongoose = require('mongoose');

mongoose.model('Product', {
    // name, quantity

    name: {
        type: 'String',
        require: false,
    },
    quantity: {
        type: 'Number',
        require: false,
    },
})