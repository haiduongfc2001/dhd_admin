import {Button, Modal, Form, ModalTitle, FloatingLabel} from "react-bootstrap";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "~/api/api";
import {AiFillEdit} from "react-icons/ai";

const EditCompany = ({cx, company}) => {
    const [show, setShow] = useState(false);

    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState("");

    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.value);
    };

    const handleShow = () => {
        setName(company.name);
        setCountry(company.country);
        setImage(company.image);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setErrorMessage('');
    };

    const handleEditCompany = async (e) => {
        e.preventDefault();

        if (!name) {
            setErrorMessage('Xin nhập tên của nhà sản xuất!');
            return;
        } else if (!country) {
            setErrorMessage('Xin nhập vào trường country');
            return;
        }

        try {
            console.log('CompanyID: ', company._id);

            const response = await api.put(`/company/${company._id}`, {
                name,
                country,
                image,
            });

            const updatedCompany = response.data;
            // Handle the updated company data here or close the modal
            console.log("Updated Company:", updatedCompany);

            handleClose();
            setErrorMessage('');

            toast.success(`Company ${name} has been updated!`, {
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
    };

    // useEffect(() => {
    //     setName(company.name);
    //     setCountry(company.country);
    // }, [company]);

    const editCompanyForm = [
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
                variant="success"
                className={cx('button-delete')}
                style={{fontSize: "var(--default-font-size-button)"}}
                onClick={handleShow}
            >
                <AiFillEdit className={cx('icon-action')}/>
                {/*Edit*/}
            </Button>

            <Modal show={show} backdrop="static" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Edit Company</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}

                    <Form inline='true' className={cx('form-company')}>
                        {editCompanyForm.map((form, index) => (
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
                        {company.image  ? (
                            <img
                                src={company.image}
                                alt={company.name}
                                style={{width: "125px", height: "60px"}}
                            />
                        ) : (
                            <span>Không có ảnh</span>
                        )
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleEditCompany}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditCompany;
