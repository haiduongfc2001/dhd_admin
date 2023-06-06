import React, {useEffect, useRef, useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {IoMdAddCircle} from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import {toast} from "react-toastify";
import api from "~/api/api";

function AddSupplier({cx}) {
    const [show, setShow] = useState(false);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
        setName('');
        setCountry('');
        setErrorMessage('');
    }

    const handleAddSupplier = async (e) => {
        e.preventDefault();

        if (!name || !country) {
            setErrorMessage('Xin nhập đủ thông tin!');
            return;
        }

        const data = {
            name: name,
            country: country
        };

        try {

            const response = await api.post('/supplier', data);

            setShow(false);
            setName('');
            setCountry('');
            setErrorMessage('');
            toast.success('Supplier added successfully!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } catch (e) {
            console.error(e);
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

    }

    const addSupplierForm = [
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
                size="lg"
                variant="primary"
                className={"mb-4"}
                onClick={handleShow}
            >
                <IoMdAddCircle className={cx('icon-action')}/>
            </Button>

            <Modal
                show={show}
                backdrop={'static'}
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Supplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}

                    <Form inline={true} className={cx('form-supplier')}>
                        {addSupplierForm.map((form, index) => (
                            <FloatingLabel
                                key={index}
                                label={form.label}
                                className='mr-sm-2 mb-2'
                            >
                                <Form.Control
                                    // ref={form.name === "name" ? nameInputRef : null}
                                    autoFocus={form.id === "name"}
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
                    <Button type="submit" variant="primary" onClick={handleAddSupplier}>
                        Add Supplier
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddSupplier;