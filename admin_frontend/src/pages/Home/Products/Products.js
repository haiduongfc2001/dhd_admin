import {useEffect, useRef, useState} from "react";
import axios from 'axios';
import {Table, Form, Button} from 'react-bootstrap';
import {BsTrash} from 'react-icons/bs';
import {IoMdAddCircle} from 'react-icons/io';
import {HiPencilAlt} from "react-icons/hi";
import classNames from "classnames/bind"
import styles from "./Product.module.scss"

const cx = classNames.bind(styles)


function ListProducts() {
    // const [todos, setTodos] = useState([
    //     {id: 1, product: 'Product 1', quantity: 5},
    //     {id: 2, product: 'Product 2', quantity: 10},
    //     {id: 3, product: 'Product 3', quantity: 3},
    // ]);
    // const [newTodo, setNewTodo] = useState({});

    const [products, setProducts] = useState([]);
    const  [newProduct, setNewProduct] = useState({});

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
        const id = products.length + 1;
        setProducts([...products, {id, ...newProduct}]);
        setNewProduct({});

        axios.delete('http://localhost:5000/product')
            .then(response => {
                setProducts(products.filter((product) => product._id !== id));
            })
            .catch(error => {
                console.log(error);
            });

        productNameRef.current.focus();
    };

    const handleUpdateProduct = (id, newProduct, newQuantity) => {
        setProducts(products.map((product) => {
            if (product.id === id) {
                return {...product, product: newProduct, quantity: newQuantity};
            }
            return product;
        }));
    }


    // const handleDeleteProduct = (id) => {
    //     setProducts(products.filter((product) => product._id !== id));
    // };

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
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <Button
                                variant="warning"
                                onClick={() => handleUpdateProduct(product._id)}
                                className={cx('button-update')}
                            >
                                <HiPencilAlt className={cx('icon-update')}/>
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteProduct(product._id)}
                                className={cx('button-delete')}
                            >
                                <BsTrash className={cx('icon-delete')}/>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Form inline className={cx('form-product')}>
                <Form.Control
                    ref={productNameRef}
                    name="product"
                    placeholder="Product name"
                    value={newProduct.product || ''}
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
                    <IoMdAddCircle/>
                </Button>
            </Form>
        </>
    );
}

export default ListProducts;