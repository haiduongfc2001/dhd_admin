import React, {useEffect, useRef, useState} from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '~/api/api'
import {Table} from 'react-bootstrap';
import AddProduct from "./AddProduct"
import DeleteProduct from "./DeleteProduct";

import classNames from "classnames/bind"
import styles from "./Product.module.scss"
import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";
import EditProduct from "~/pages/Home/Products/EditProduct";

const cx = classNames.bind(styles)

function ListProducts() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({});
    const nameInputRef = useRef(null);

    useEffect(() => {
        api.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const actionArray = [
        {
            type: 'component',
            component: (product) => (
                <EditProduct
                    cx={cx}
                    product={product}
                    products={products}
                    setProducts={setProducts}
                    nameInputRef={nameInputRef}
                />
            ),
        },
        {
            type: 'component',
            component: (product) => (
                <DeleteProduct
                    cx={cx}
                    styles={styles}
                    product={product}
                    products={products}
                    setProducts={setProducts}
                />
            ),
        },
    ]

    return (
        <>
            <BreadcrumbExample/>
            <AddProduct
                cx={cx}
                styles={styles}
                newProduct={newProduct}
                setProducts={setProducts}
                setNewProduct={setNewProduct}
                nameInputRef={nameInputRef}
            />

            <Table striped bordered hover>
                <thead>
                <tr style={{backgroundColor: 'antiquewhite'}} className={cx('table-product-category')}>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td style={{textAlign: "center"}}>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>
                            {actionArray.map((action, index) => (
                                <React.Fragment key={index}>
                                    {action.component(product)}
                                </React.Fragment>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <ToastContainer/>
        </>
    );
}

export default ListProducts;

