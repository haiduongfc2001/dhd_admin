import {useEffect, useRef, useState} from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Table, Form, Button} from 'react-bootstrap';
import {BsTrash} from 'react-icons/bs';
import {HiPencilAlt} from "react-icons/hi";
import {GiCancel} from "react-icons/gi";
import {AiFillSave} from "react-icons/ai";
import AddProduct from "./AddProduct"
import DeleteProduct from "./DeleteProduct";

import classNames from "classnames/bind"
import styles from "./Product.module.scss"
import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";

const cx = classNames.bind(styles)

function ListProducts() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({});
    const [editableProduct, setEditableProduct] = useState(null);
    const nameRef = useRef(null);
    const quantityRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleEditProduct = (id) => {
        const editedProduct = {
            name: nameRef.current.value,
            quantity: quantityRef.current.value
        }
        axios.put(`http://localhost:5000/product/${id}`, editedProduct)
            .then(response => {
                // edit products state
                const editedProducts = products.map(product => {
                    if (product._id === id) {
                        return {...product, ...editedProduct};
                    }
                    return product;
                });
                setProducts(editedProducts);
                setEditableProduct(null);
                toast.success('Product has been updated!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    theme: "colored",
                });
            })
            .catch(error => {
                console.log(error);
                toast.error('Error edit product!');
            });
    }

    const handleCancelEditProduct = () => {
        // const originalProduct = products.find(product => product._id === id);
        // nameRef.current.value = originalProduct.name;
        // quantityRef.current.value = originalProduct.quantity;
        setEditableProduct(null);
    }

    return (
        <>
            <BreadcrumbExample />
            <AddProduct
                cx={cx}
                styles={styles}
                newProduct={newProduct}
                setProducts={setProducts}
                setNewProduct={setNewProduct}
            />

            <Table striped bordered hover>
                <thead>
                <tr  style={{backgroundColor: 'antiquewhite'}} className={cx('table-product-category')}>
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
                        {/*<td>{product.name}</td>*/}
                        {/*<td>{product.quantity}</td>*/}
                        <td>
                            {editableProduct === product._id ?
                                <Form.Control
                                    ref={nameRef}
                                    type="text"
                                    defaultValue={product.name}
                                />
                                :
                                <span>{product.name}</span>
                            }
                        </td>
                        <td>
                            {editableProduct === product._id ?
                                <Form.Control
                                    ref={quantityRef}
                                    type="text"
                                    defaultValue={product.quantity}
                                />
                                :
                                <span>{product.quantity}</span>
                            }
                        </td>

                        <td>
                            {editableProduct === product._id ?
                                <div>
                                    <Button
                                        variant="success"
                                        onClick={() => handleEditProduct(product._id)}
                                        className={cx('button-edit')}
                                    >
                                        <AiFillSave className={cx('icon-action')}/>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleCancelEditProduct(product._id)}
                                        className={cx('button-edit')}
                                    >
                                        <GiCancel className={cx('icon-action')}/>
                                    </Button>
                                </div>
                                :
                                <Button
                                    variant="warning"
                                    onClick={() => setEditableProduct(product._id)}
                                    className={cx('button-edit')}
                                >
                                    <HiPencilAlt className={cx('icon-action')}/>
                                </Button>
                            }
                            <DeleteProduct
                                cx={cx}
                                product={product}
                                products={products}
                                setProducts={setProducts}
                            />
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