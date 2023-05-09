const mongoose = require('mongoose');

mongoose.model('Product', {
    // name, quantity
    name: {
        type: 'String',
        require: true,
    },
    quantity: {
        type: 'Number',
        require: true,
    },
})

