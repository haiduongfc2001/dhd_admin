// import {useRef, useState} from "react";
// import {IoMdAddCircle} from "react-icons/io";
// import {Button, FloatingLabel, Form, ModalTitle} from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
// import api from "~/api/api";
//
// function AddUser({cx, styles, setUsers}) {
//     const [show, setShow] = useState(false);
//     const userNameRef = useRef(null);
//     const [newUser, setNewUser] = useState({});
//
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [image, setImage] = useState(null);
//
//     const handleNameChange = (e) => {
//         setName(e.target.value);
//     };
//
//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };
//
//     const handlePhoneChange = (e) => {
//         setPhone(e.target.value);
//     };
//
//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };
//
//     const handleAddUser = async (e) => {
//         e.preventDefault();
//
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('email', email);
//         formData.append('phone', phone);
//         formData.append('image', image);
//
//         try {
//             const response = await api.post('/admin/add-user', formData);
//             setSuccessMessage(response.data.message);
//             setNewUser({});
//             setShow(false);
//             setErrorMessage('');
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     const handleShow = () => setShow(true);
//     const handleClose = () => {
//         setShow(false);
//         setNewUser({});
//     };
//
//     return (
//         <>
//             <Button onClick={handleShow}>
//                 <IoMdAddCircle/>
//             </Button>
//
//             <Modal
//                 show={show}
//                 backdrop={"static"}
//                 centered
//                 onHide={handleClose}
//             >
//                 <Modal.Header closeButton>
//                     <ModalTitle>Add User</ModalTitle>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <FloatingLabel
//                             label="User Name"
//                         >
//                             <Form.Control
//                                 ref={userNameRef}
//                                 type="text"
//                                 id="name"
//                                 value={name}
//                                 placeholder="User Name"
//                                 onChange={handleNameChange}
//                             />
//                         </FloatingLabel>
//                         <FloatingLabel
//                             label="User Email"
//                         >
//                             <Form.Control
//                                 type="email"
//                                 id="email"
//                                 value={email}
//                                 placeholder="User Email"
//                                 onChange={handleEmailChange}
//                             />
//                         </FloatingLabel>
//                         <FloatingLabel
//                             label="User Phone Number"
//                         >
//                             <Form.Control
//                                 type="number"
//                                 id="phone"
//                                 value={phone}
//                                 placeholder="User Phone Number"
//                                 onChange={handlePhoneChange}
//                             />
//                         </FloatingLabel>
//                         <FloatingLabel
//                             label="Avatar"
//                             className="mr-sm-2 mb-2"
//                         >
//                             <Form.Control
//                                 type="file"
//                                 id="image"
//                                 onChange={handleImageChange}
//                             />
//                         </FloatingLabel>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button type="submit" onClick={handleAddUser}>
//                         Add User
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }
//
// export default AddUser;