import {useEffect, useRef, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Table, Form, Button} from 'react-bootstrap';
import {HiPencilAlt} from "react-icons/hi";
import {GiCancel} from "react-icons/gi";
import {AiFillSave} from "react-icons/ai";


function ListProducts() {

    const [products, setProducts] = useState([]);
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
                const editedProducts = products.map(product => {
                    if (product._id === id) {
                        return {...product, ...editedProduct};
                    }
                    return product;
                });
                setProducts(editedProducts);
                setEditableProduct(null);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleCancelEditProduct = () => {
        //
    }

    return (
        <>
            <Table>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
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
                                        onClick={() => handleEditProduct(product._id)}
                                    >
                                        <AiFillSave/>
                                    </Button>
                                    <Button
                                        onClick={() => handleCancelEditProduct(product._id)}
                                    >
                                        <GiCancel/>
                                    </Button>
                                </div>
                                :
                                <Button
                                    onClick={() => setEditableProduct(product._id)}
                                >
                                    <HiPencilAlt/>
                                </Button>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default ListProducts;