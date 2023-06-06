const Product = require("../models/ProductModel/ProductModel");
const Supplier = require("../models/ProductModel/SupplierModel");
const randomstring = require("randomstring");
const User = require("../models/UserModel");

// Tất cả sản phẩm
const AllProducts = async (req, res) => {
    // try {
    //     const products = await Product.find()
    //     res.json(products);
    // } catch (error) {
    //     res.send(error.message);
    // }

    try {

        const products = await Product.find().populate('supplierID');
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Tìm sản phẩm theo id
const FindProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params._id).populate('supplierID');

        if (product) {
            res.json(product);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Thêm sản phẩm
const AddProduct = async (req, res) => {
    try {

        // const product = new Product({
        //     name: req.body.name,
        //     quantity: req.body.quantity,
        // });

        // const result = await product.save();
        // res.json(result);

        const product = new Product(req.body);
        await product.save();
        res.status(200).json(product);

    } catch (error) {
        res.send(error.message);
    }
}

// Sửa thông tin sản phẩm
const EditProduct = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const productId = req.params._id;

        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, quantity }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa sản phẩm
const DeleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findOneAndRemove({_id: req.params._id});

        if (deleteProduct) {
            res.send(`Product ${req.params._id} deleted successfully!`);
        } else {
            res.send(`Product ${req.params._id} not found!`);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// // Delete a product
// app.delete('/product/:_id', (req, res) => {
//     Product.findOneAndRemove({_id: req.params._id}).then((product) => {
//         if (product) {
//             res.send(`Product ${req.params._id} deleted successfully!`);
//         } else {
//             res.send(`Product ${req.params._id} not found!`);
//         }
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).send('Error deleting product');
//     });
// });


// Tất cả các nhà cung cấp (Supplier)
const AllSuppliers = async (req, res) => {
    try {

        const suppliers = await Supplier.find();
        res.json(suppliers);

    } catch {
        res.status(500).json({message: 'Internal Server Error!'});
    }
}

// Thêm nhà sản xuất
const AddSupplier = async (req, res) => {
    try {

        // const product = new Product(req.body);
        // await product.save();
        // res.status(200).json(product);

        const supplier = new Supplier(req.body);
        await supplier.save();
        res.status(200).json(supplier);

    } catch (error) {
        res.send(error.message);
    }
}


module.exports = {
    AddProduct,
    AllProducts,
    FindProductById,
    EditProduct,
    DeleteProduct,

    // Supplier
    AllSuppliers,
    AddSupplier,
}
