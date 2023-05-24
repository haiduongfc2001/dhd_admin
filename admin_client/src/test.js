import {useRef, useState} from "react";
import {IoMdAddCircle} from "react-icons/io";
import {Button, FloatingLabel, Form, ModalTitle} from "react-bootstrap";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import api from "~/api/api";

function AddProduct({cx, styles, newProduct, setNewProduct, setProducts}) {
    const [show, setShow] = useState(false);
    const productNameRef = useRef(null)

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setNewProduct({});
    }

    const handleAddProduct = () => {
        api
            .post("/product", newProduct)
            .then((response) => {
                setProducts((prevState) => [...prevState, response.data]);
                setNewProduct({});
                setShow(false);
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

    function handleInputChange(e) {
        const {name, value} = e.target;
        if (name === 'quantity' && !validateInput(value)) {
            return; // Do not update state if input is invalid
        }
        setNewProduct(prevState => ({...prevState, [name]: value}));
    }

    function validateInput(value) {
        const regex = /^[1-9]\d*$/;
        return regex.test(value);
    }

    const addProductForm = [
        {
            label: "Product Name",
            type: "text",
            name: "name",
            placeholder: "Product Name",
            value: newProduct.name || '',
            onChange: handleInputChange,
            ref: productNameRef,
        },
        {
            label: "Product Quantity",
            type: "number",
            name: "quantity",
            placeholder: "Product Quantity",
            value: newProduct.quantity || '',
            onChange: handleInputChange,
        },
    ]

    return (
        <>
            <Button
                size="lg"
                variant="primary"
                className={"mb-4"}
                onClick={handleShow}
            >
                <IoMdAddCircle className={cx('icon-action')}/>
            </Button>

            <Modal
                show={show}
                backdrop={"static"}
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <ModalTitle>Add Product</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <Form inline="true" className={cx('form-product')}>
                        {addProductForm.map((form, index) => (
                            <FloatingLabel
                                label={form.label}
                                className="mr-sm-2 mb-2"
                            >
                                <Form.Control
                                    ref={form.ref}
                                    name={form.name}
                                    type={form.type}
                                    placeholder={form.placeholder}
                                    value={form.value}
                                    onChange={form.onChange}
                                    size="lg"
                                    style={{minHeight: "40px"}}
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
                    <Button variant="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddProduct;