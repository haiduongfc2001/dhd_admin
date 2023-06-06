import {Button, Modal, Form, ModalTitle, FloatingLabel} from "react-bootstrap";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "~/api/api";

const EditSupplier = ({cx, supplier}) => {
    const [show, setShow] = useState(false);

    const [name, setName] = useState("");
    const [country, setCountry] = useState("");

    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleShow = () => {
        setName(supplier.name);
        setCountry(supplier.country);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setErrorMessage('');
    };

    const handleEditSupplier = async (e) => {
        e.preventDefault();

        if (!name || !country) {
            setErrorMessage('Xin nhập đủ thông tin!');
            return;
        }

        try {
            console.log('SupplierID: ', supplier._id);

            const response = await api.put(`/supplier/${supplier._id}`, {
                name,
                country,
            });

            const updatedSupplier = response.data;
            // Handle the updated supplier data here or close the modal
            console.log("Updated Supplier:", updatedSupplier);

            handleClose();
            setErrorMessage('');

            toast.success(`Supplier ${name} has been updated!`, {
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
            toast.error('Error adding supplier!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    // useEffect(() => {
    //     setName(supplier.name);
    //     setCountry(supplier.country);
    // }, [supplier]);

    const editSupplierForm = [
        {
            label: (
                <>
                    Supplier Name{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            type: "text",
            id: "name",
            value: name,
            onChange: handleNameChange,
        },
        {
            label: (
                <>
                    Supplier Country{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            type: "text",
            id: "country",
            value: country,
            onChange: handleCountryChange,
        },
    ]

    return (
        <>
            <Button
                variant="success"
                className={cx('button-delete')}
                style={{fontSize: "var(--default-font-size-button)"}}
                onClick={handleShow}
            >
                Edit
            </Button>

            <Modal show={show} backdrop="static" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Edit Supplier</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}

                    <Form inline='true' className={cx('form-supplier')}>
                        {editSupplierForm.map((form, index) => (
                            <FloatingLabel
                                key={index}
                                label={form.label}
                                className="mr-sm-2 mb-3"
                            >
                                <Form.Control
                                    autoFocus={form.id === 'name'}
                                    type={form.type}
                                    id={form.id}
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
                    <Button variant="success" onClick={handleEditSupplier}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditSupplier;
