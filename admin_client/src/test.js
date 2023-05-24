import {Button, FloatingLabel, Modal, Form, ModalTitle} from "react-bootstrap";
import {useRef, useState} from "react";
import api from "~/api/api";
import {HiPencilAlt} from "react-icons/hi";

const UpdateProduct = ({cx, styles, products, setProducts}) => {
    const [show, setShow] = useState(false);
    const productNameRef = useRef(null);

    const [editProduct, setEditProduct] = useState({});

    const handleShow = (product) => {
        setEditProduct(product);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setEditProduct({});
    };

    const handleEditProduct = (id) => {
        if (!editProduct.name || !editProduct.quantity) {
            return;
        }

        api
            .put(`/product/${id}`, editProduct)
            .then((response) => {
                const updatedProducts = products.map((product) => {
                    if (product._id === id) {
                        return {...product, ...editProduct};
                    }
                    return product;
                });
                setProducts(updatedProducts);
                setEditProduct({});
            })
            .catch((error) => {
                console.log(error);
            });

        productNameRef.current.focus();
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditProduct((prevState) => ({...prevState, [name]: value}));
    };

    const editProductForm = [
        {
            label: (
                <>
                    Product Name{" "}
                    <span style={{color: "red"}} dangerouslySetInnerHTML={{__html: "*"}}/>
                </>
            ),
            type: "text",
            name: "name",
            placeholder: "Product Name",
            value: editProduct.name || "",
            onChange: handleInputChange,
            ref: productNameRef,
        },
        {
            label: (
                <>
                    Product Quantity{" "}
                    <span style={{color: "red"}} dangerouslySetInnerHTML={{__html: "*"}}/>
                </>
            ),
            type: "number",
            name: "quantity",
            placeholder: "Product Quantity",
            value: editProduct.quantity || "",
            onChange: handleInputChange,
        },
    ];

    return (
        <>
            <Button
                size="lg"
                variant="primary"
                className="mb-4"
                onClick={handleShow}
            >
                <HiPencilAlt/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Edit Product</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <Form inline={true} className={cx("form-product")}>
                        {editProductForm.map((form, index) => (
                            <FloatingLabel key={index} label={form.label} className="mr-sm-2 mb-2">
                                <Form.Control
                                    ref={form.ref}
                                    name={form.name}
                                    type={form.type}
                                    placeholder={form.placeholder}
                                    value={form.value}
                                    onChange={form.onChange}
                                    required
                                />
                            </FloatingLabel>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => handleEditProduct(editProduct._id)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateProduct;
