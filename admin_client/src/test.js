import {useRef, useState} from "react";
import {IoMdAddCircle} from "react-icons/io";
import {Button, FloatingLabel, Form, ModalTitle} from "react-bootstrap";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import api from "~/api/api";

function AddUser({cx, styles, setUsers}) {
    const [show, setShow] = useState(false);
    const userNameRef = useRef(null);
    const [newUser, setNewUser] = useState({});

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleAddUser = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('image', image);

        try {
            const response = await api.post('/admin/add-user', formData);
            setSuccessMessage(response.data.message);
            // setNewUser({});
            setShow(false);setName('');
            setEmail('');
            setPhone('');
            setImage(null);
            setErrorMessage('');
            toast.success('User added successfully!', {
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
            // setErrorMessage('Failed to add user');
            toast.error('Error adding user!');
            console.error(error);
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        // setNewUser({});
        setName('');
        setEmail('');
        setPhone('');
        setImage(null);
        setErrorMessage('');
    };

    // <FloatingLabel
    //     label="Avatar"
    //     className="mr-sm-2 mb-2"
    // >
    //     <Form.Control
    //         type="file"
    //         id="image"
    //         onChange={handleImageChange}
    //         size="lg"
    //         style={{minHeight: "40px"}}
    //         required
    //     />
    // </FloatingLabel>

    const addUserForm = [
        {
            label: 'User Name',
            ref: 'userNameRef',
            type: 'text',
            id: 'name',
            value: 'name',
            placeholder: 'User Name',
            onChange: 'handleNameChange'
        },
        {
            label: 'User Email',
            type: 'email',
            id: 'email',
            value: 'email',
            placeholder: 'User Email',
            onChange: 'handleEmailChange'
        },
        {
            label: 'User Phone Number',
            type: 'number',
            id: 'phone',
            value: 'phone',
            placeholder: 'User Phone Number',
            onChange: 'handlePhoneChange'
        },
        {
            label: 'Avatar',
            type: 'file',
            id: 'image',
            onChange: 'handleImageChange'
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
                    <ModalTitle>Add User</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}
                    {successMessage && <p>{successMessage}</p>}

                    <Form inline="true" className={cx('form-user')}>
                        <FloatingLabel
                            label="User Name"
                            className="mr-sm-2 mb-2"
                        >
                            <Form.Control
                                ref={userNameRef}
                                type="text"
                                id="name"
                                value={name}
                                placeholder="User Name"
                                onChange={handleNameChange}
                                size="lg"
                                style={{minHeight: "40px"}}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="User Email"
                            className="mr-sm-2 mb-2"
                        >
                            <Form.Control
                                type="email"
                                id="email"
                                value={email}
                                placeholder="User Email"
                                onChange={handleEmailChange}
                                size="lg"
                                style={{minHeight: "40px"}}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="User Phone Number"
                            className="mr-sm-2 mb-2"
                        >
                            <Form.Control
                                type="number"
                                id="phone"
                                value={phone}
                                placeholder="User Phone Number"
                                onChange={handlePhoneChange}
                                size="lg"
                                style={{minHeight: "40px"}}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Avatar"
                            className="mr-sm-2 mb-2"
                        >
                            <Form.Control
                                type="file"
                                id="image"
                                onChange={handleImageChange}
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
                    <Button type="submit" variant="primary" onClick={handleAddUser}>
                        Add User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddUser;