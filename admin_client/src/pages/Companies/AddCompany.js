import React, {useEffect, useRef, useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {IoMdAddCircle} from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import {toast} from "react-toastify";
import api from "~/api/api";

function AddCompany({cx}) {
    const [show, setShow] = useState(false);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    }

    const handleImageChange = (e) => {
        setImage(e.target.value);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
        setName('');
        setCountry('');
        setImage('');
        setErrorMessage('');
    }

    const handleAddCompany = async (e) => {
        e.preventDefault();

        if (!name) {
            setErrorMessage('Xin nhập tên của nhà sản xuất!');
            return;
        } else if (!country) {
            setErrorMessage('Xin nhập vào trường country');
            return;
        }

        const data = {
            name: name,
            country: country,
            image: image,
        };

        try {

            const response = await api.post('/company', data);

            console.log(response.data);

            setShow(false);
            setName('');
            setCountry('');
            setImage('');
            setErrorMessage('');
            toast.success('Company added successfully!', {
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
            toast.error('Error adding company!', {
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

    const addCompanyForm = [
        {
            label: (
                <>
                    Company Name{" "}
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
                    Company Country{" "}
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
        {
            label: (
                <>
                    Company Image{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            type: "text",
            id: "image",
            value: image,
            onChange: handleImageChange,
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
                    <Modal.Title>Add Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}

                    <Form className={cx('form-company')}>
                        {addCompanyForm.map((form, index) => (
                            <FloatingLabel
                                key={index}
                                label={form.label}
                                className='mr-sm-2 mb-2'
                            >
                                <Form.Control
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
                    <Button type="submit" variant="primary" onClick={handleAddCompany}>
                        Add Company
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddCompany;