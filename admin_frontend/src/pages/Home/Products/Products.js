import {useEffect, useRef, useState} from "react";
import axios from 'axios';
import {Table, Form, Button} from 'react-bootstrap';
import {BsTrash} from 'react-icons/bs';
import {IoMdAddCircle} from 'react-icons/io';
import {HiPencilAlt} from "react-icons/hi";
import classNames from "classnames/bind"
import styles from "./Product.module.scss"
import {AiFillSave} from "react-icons/ai";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteModal from "~/components/Layout/components/Modal/DeleteModal";

const cx = classNames.bind(styles)


function ListProducts() {

    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({});
    const [editableProduct, setEditableProduct] = useState(null);
    const nameRef = useRef(null);
    const quantityRef = useRef(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setProductIdToDelete(null);
    };

    const handleShowDeleteModal = (id) => {
        setShowDeleteModal(true);
        setProductIdToDelete(id);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const productNameRef = useRef(null);

    function validateInput(value) {
        const regex = /^[1-9]\d*$/; // Only allow positive integers not starting with 0
        return regex.test(value);
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        if (name === 'quantity' && !validateInput(value)) {
            return; // Do not update state if input is invalid
        }
        setNewProduct(prevState => ({...prevState, [name]: value}));
    }


    const handleAddProduct = () => {
        axios
            .post("http://localhost:5000/product", newProduct)
            .then((response) => {
                setProducts((prevState) => [...prevState, response.data]);
                setNewProduct({});
                toast.success('Product added successfully!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error('Error adding product!');
            });

        productNameRef.current.focus();
    };

    const handleUpdateProduct = (id) => {
        const updatedProduct = {
            name: nameRef.current.value,
            quantity: quantityRef.current.value
        }
        axios.put(`http://localhost:5000/product/${id}`, updatedProduct)
            .then(response => {
                // update products state
                const updatedProducts = products.map(product => {
                    if (product._id === id) {
                        return {...product, ...updatedProduct};
                    }
                    return product;
                });
                setProducts(updatedProducts);
                setEditableProduct(null);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleDeleteProduct = (id) => {
        axios.delete(`http://localhost:5000/product/${id}`)
            .then(response => {
                setProducts(products.filter((product) => product._id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr className={cx('table-product-category')}>
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
                                <Button
                                    variant="success"
                                    onClick={() => handleUpdateProduct(product._id)}
                                    className={cx('button-update')}
                                >
                                    <AiFillSave className={cx('icon-action')}/>
                                </Button>
                                :
                                <Button
                                    variant="warning"
                                    onClick={() => setEditableProduct(product._id)}
                                    className={cx('button-update')}
                                >
                                    <HiPencilAlt className={cx('icon-action')}/>
                                </Button>
                            }
                            <Button
                                variant="danger"
                                className={cx('button-delete')}
                                onClick={() => handleShowDeleteModal(product._id)}
                            >
                                <BsTrash className={cx('icon-action')}/>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/*{productIdToDelete && (*/}
            {/*    <DeleteModal*/}
            {/*        handleDeleteProduct={handleDeleteProduct}*/}
            {/*        productId={productIdToDelete}*/}
            {/*        handleClose={handleCloseDeleteModal}*/}
            {/*    />*/}
            {/*)}*/}

            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={() => handleDeleteProduct(productIdToDelete)}
            />

            <Form inline="true" className={cx('form-product')}>
                <Form.Control
                    ref={productNameRef}
                    name="name"
                    type="text"
                    placeholder="Product name"
                    value={newProduct.name || ""}
                    onChange={handleInputChange}
                    className="mr-sm-2 mb-2"
                    size="lg"
                    style={{minHeight: "40px"}}
                />
                <Form.Control
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity || ''}
                    onChange={handleInputChange}
                    className="mr-sm-2 mb-2"
                    size="lg"
                    style={{minHeight: "40px"}}
                />
                <Button variant="primary" onClick={handleAddProduct}>
                    <IoMdAddCircle className={cx('icon-action')}/>
                </Button>
                <ToastContainer />
            </Form>
        </>
    );
}

export default ListProducts;