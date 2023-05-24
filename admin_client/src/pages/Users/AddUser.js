import {useRef, useState} from "react";
import {IoMdAddCircle} from "react-icons/io";
import {Button, FloatingLabel, Form, ModalTitle} from "react-bootstrap";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import api from "~/api/api";

function AddUser({cx, styles, setUsers}) {
    const [show, setShow] = useState(false);
    const userNameRef = useRef(null);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        phone: "",
        image: "",
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('image', image);

        try {
            const response = await api.post('/admin/add-user', formData);
            setSuccessMessage(response.data.message);
            setName('');
            setEmail('');
            setPhone('');
            setImage(null);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to add user');
            console.error(error);
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setNewUser({
            name: "",
            email: "",
            phone: "",
            image: "",
        });
    };

    const handleAddUser = () => {
        api
            .post('/admin/add-user', newUser)
            .then((response) => {
                setUsers((prevState) => [...prevState, response.data]);
                setShow(false);
                setNewUser({
                    name: "",
                    email: "",
                    phone: "",
                    image: "",
                });
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
            })
            .catch((error) => {
                console.log(error);
                toast.error('Error adding user!');
            });

        userNameRef.current.focus();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevState) => ({ ...prevState, [name]: value }));
    };

    function validateInput(value) {
        const regex = /^[1-9]\d*$/; // Only allow positive integers not starting with 0
        return regex.test(value);
    }

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

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} onChange={handleNameChange} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={handleEmailChange} />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" value={phone} onChange={handlePhoneChange} />
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input type="file" id="image" onChange={handleImageChange} />
                        </div>
                        <button type="submit">Add User</button>
                    </form>

                    {/*<Form inline="true" className={cx('form-user')}>*/}
                    {/*    <FloatingLabel*/}
                    {/*        label="User Name"*/}
                    {/*        className="mr-sm-2 mb-2"*/}
                    {/*    >*/}
                    {/*        <Form.Control*/}
                    {/*            ref={userNameRef}*/}
                    {/*            name="name"*/}
                    {/*            type="text"*/}
                    {/*            placeholder="User Name"*/}
                    {/*            value={newUser.name}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*            size="lg"*/}
                    {/*            style={{minHeight: "40px"}}*/}
                    {/*        />*/}
                    {/*    </FloatingLabel>*/}
                    {/*    <FloatingLabel*/}
                    {/*        label="User Email"*/}
                    {/*        className="mr-sm-2 mb-2"*/}
                    {/*    >*/}
                    {/*        <Form.Control*/}
                    {/*            name="email"*/}
                    {/*            type="email"*/}
                    {/*            placeholder="User Email"*/}
                    {/*            value={newUser.email}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*            size="lg"*/}
                    {/*            style={{minHeight: "40px"}}*/}
                    {/*        />*/}
                    {/*    </FloatingLabel>*/}
                    {/*    <FloatingLabel*/}
                    {/*        label="User Phone Number"*/}
                    {/*        className="mr-sm-2 mb-2"*/}
                    {/*    >*/}
                    {/*        <Form.Control*/}
                    {/*            name="phone"*/}
                    {/*            type="number"*/}
                    {/*            placeholder="Prouduct Quantity"*/}
                    {/*            value={newUser.phone}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*            size="lg"*/}
                    {/*            style={{minHeight: "40px"}}*/}
                    {/*        />*/}
                    {/*    </FloatingLabel>*/}
                    {/*    <FloatingLabel*/}
                    {/*        label="User Image"*/}
                    {/*        className="mr-sm-2 mb-2"*/}
                    {/*    >*/}
                    {/*        <Form.Control*/}
                    {/*            name="image"*/}
                    {/*            type="file"*/}
                    {/*            onChange={(e) => {*/}
                    {/*                const file = e.target.files[0];*/}
                    {/*                setNewUser((prevState) => ({*/}
                    {/*                    ...prevState,*/}
                    {/*                    image: file,*/}
                    {/*                }));*/}
                    {/*            }}*/}
                    {/*            size="lg"*/}
                    {/*            style={{minHeight: "40px"}}*/}
                    {/*        />*/}
                    {/*    </FloatingLabel>*/}
                    {/*</Form>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddUser}>
                        Add User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddUser;