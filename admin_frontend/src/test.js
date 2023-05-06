import {useEffect, useState} from "react";
import axios from 'axios';
import {Table, Button} from 'react-bootstrap';


function ListProducts() {

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

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product._id !== id));
    };

    return (
        <>
            <Table striped bordered hover>
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
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <Button
                                onClick={() => handleDeleteProduct(product._id)}
                            >
                                <span>Delete</span>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default ListProducts;