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
const bodyParser = require('body-parser');

const cors = require('cors');

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

// Create a new product
app.post('/product', (req, res) => {
    const newProduct = {
        name: req.body.title,
        quantity: req.body.quantity,
    };
    // Create a new Product
    const product = new Product(newProduct);

    product.save().then(() => {
        console.log('New product created!')
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
    res.send('A new product created with success!');
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
app.get('/product/:id', (req, res) => {
    Product.findById(req.params.id).then((product) => {
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
app.delete('/product/:id', (req, res) => {
    Product.findOneAndRemove(req.params.id).then(() => {
        res.send('Product deleted with success!')
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.listen(5000, () => {
    console.log('Up to running! -- This is our Products service');
});






