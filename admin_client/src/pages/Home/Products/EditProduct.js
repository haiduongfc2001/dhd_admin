import { Button, FloatingLabel, Modal, Form, ModalTitle } from "react-bootstrap";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "~/api/api";
import { HiPencilAlt } from "react-icons/hi";

const UpdateProduct = ({ cx, styles, product, products, setProducts }) => {
    const [show, setShow] = useState(false);
    const productNameRef = useRef(null);

    const [editProduct, setEditProduct] = useState({
        _id: product._id,
        name: product.name,
        quantity: product.quantity
    });

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleEditProduct = async () => {
        if (!editProduct.name || !editProduct.quantity) {
            toast.error("Please enter product name and quantity.");
            return;
        }

        try {
            const response = await api.put(`/product/${editProduct._id}`, editProduct);
            const updatedProducts = products.map((p) => {
                if (p._id === editProduct._id) {
                    return { ...p, ...editProduct };
                }
                return p;
            });
            setProducts(updatedProducts);
            handleClose();
            toast.success(`Product ${editProduct.name} has been updated!`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while updating the product.");
        }

        productNameRef.current.focus();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct((prevState) => ({ ...prevState, [name]: value }));
    };

    const editProductForm = [
        {
            label: (
                <>
                    Product Name{" "}
                    <span style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: "*" }} />
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
                    <span style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: "*" }} />
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
                <HiPencilAlt className={cx("icon-action")} />
            </Button>

            <Modal show={show} backdrop="static" centered onHide={handleClose}>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleEditProduct}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateProduct;
