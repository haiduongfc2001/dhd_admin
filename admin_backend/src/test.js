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

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/admin_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/products', (req, res) => {
    Product.find((err, products) => {
        if (err) {
            res.send(err);
        } else {
            res.json(products);
        }
    });
});

app.post('/api/products', (req, res) => {
    const product = new Product({
        name: req.body.name,
        quantity: req.body.quantity
    });

    product.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Product created successfully' });
            console.log('Product created successfully');
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));






