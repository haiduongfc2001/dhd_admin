import {Button, Modal, Form, ModalTitle, FloatingLabel} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import api from "~/api/api";

const EditUser = ({cx, user}) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState(null);

    const nameInputRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleShow = () => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setErrorMessage('');
    };

    const handleEditUser = async (e) => {
        e.preventDefault();

        // Tạo một đối tượng FormData để gửi dữ liệu
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("image", image);

        if (!name || !email || !phone || !image) {
            setErrorMessage('Please enter all information!');
            return;
        }

        try {

            const response = await api.put(`/user/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const updatedUser = response.data;

            // Handle the updated user data here or close the modal
            console.log("Updated User:", updatedUser);
            handleClose();
            setErrorMessage('');
            toast.success(`User ${name} has been updated!`, {
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
            toast.error("An error occurred while updating user information.");
        }
    };

    // useEffect(() => {
    //     setName(user.name);
    //     setEmail(user.email);
    //     setPhone(user.phone);
    // }, [user]);

    useEffect(() => {
        if (show) {
            nameInputRef.current.focus();
        }
    }, [show]);

    const editUserForm = [
        {
            label: (
                <>
                    User Name{" "}
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
                    User Email{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            type: "email",
            id: "email",
            value: email,
            onChange: handleEmailChange,
        },
        {
            label: (
                <>
                    User Phone Number{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            type: "number",
            id: "phone",
            value: phone,
            onChange: handlePhoneChange,
        },
        {
            label: (
                <>
                    Avatar{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            type: "file",
            id: "image",
            onChange: handleImageChange,
        },
    ]

    return (
        <>
            <Button
                variant="success"
                className={cx('button-delete')}
                disabled={user.is_admin === 1 && user.is_verified === 1}
                style={{fontSize: "var(--default-font-size-button)"}}
                onClick={handleShow}
            >
                Edit
            </Button>

            <Modal show={show} backdrop="static" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Edit User</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}

                    <Form inline="true" className={cx('form-user')}>
                        {editUserForm.map((form, index) => (
                            <FloatingLabel
                                key={index}
                                label={form.label}
                                className="mr-sm-2 mb-3"
                            >
                                <Form.Control
                                    ref={form.id === "name" ? nameInputRef : null}
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
                    <Button variant="success" onClick={handleEditUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditUser;
