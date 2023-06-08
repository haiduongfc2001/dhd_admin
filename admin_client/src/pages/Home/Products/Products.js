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
import formatPrice from "~/hooks/formatPrice";

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
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td style={{textAlign: "center"}}>{product._id}</td>
                        <td>
                            {/*{product.name}*/}
                            <div className='d-flex align-items-center'>
                                <img
                                    src={product.img}
                                    alt="{user.name}"
                                    style={{width: '45px', height: '45px'}}
                                    className='rounded-circle'
                                />
                                <div className='ms-3'>
                                    <p
                                        className='fw-bold mb-1 limitLineClassName'
                                    >
                                        {product.name}
                                    </p>
                                    <p className='text-muted mb-0'>{product.supplierID.name}</p>
                                </div>
                            </div>
                        </td>
                        <td>{product.quantity}</td>
                        <td>
                            <div className='ms-3'>
                                <p
                                    className='fw-bold mb-1'
                                >
                                    {formatPrice(product.price - product.discount)}
                                </p>
                                <p
                                    className='text-muted mb-0'
                                    style={{ textDecoration: "line-through" }}
                                >
                                    {formatPrice(product.price)}
                                </p>
                            </div>
                        </td>
                        <td>
                            {product.category}
                        </td>
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



