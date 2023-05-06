import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import { HiPencilAlt } from "react-icons/hi";

function ListProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleUpdateProduct = (productId, updatedProduct) => {
        axios
            .put(`http://localhost:5000/products/${productId}`, updatedProduct)
            .then((response) => {
                console.log(response.data);
                // Update the products state variable with the updated product
                setProducts(
                    products.map((product) =>
                        product._id === response.data._id ? response.data : product
                    )
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (productId, event) => {
        const { name, value } = event.target;
        // Find the product being edited
        const editedProduct = products.find((product) => product._id === productId);
        // Update the edited product with the new values
        setProducts(
            products.map((product) =>
                product._id === productId
                    ? { ...editedProduct, [name]: value }
                    : product
            )
        );
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
                        <td>
                            <Form.Control
                                name="name"
                                type="text"
                                value={product.name}
                                onChange={(event) => handleInputChange(product._id, event)}
                            />
                        </td>
                        <td>
                            <Form.Control
                                name="quantity"
                                type="number"
                                value={product.quantity}
                                onChange={(event) => handleInputChange(product._id, event)}
                            />
                        </td>
                        <td>
                            <Button
                                onClick={() => handleUpdateProduct(product._id, product)}
                            >
                                <HiPencilAlt />
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
