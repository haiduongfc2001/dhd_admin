// import {useRef, useState} from "react";
// import {IoMdAddCircle} from "react-icons/io";
// import {Button, FloatingLabel, Form, ModalTitle} from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
// import api from "~/api/api";
//
// function AddUser({newUser, setNewUser, setUsers}) {
//     const [show, setShow] = useState(false);
//     const userNameRef = useRef(null)
//
//     const handleShow = () => setShow(true);
//     const handleClose = () => {
//         setShow(false);
//         setNewUser({});
//     }
//
//     const handleAddUser = () => {
//         api.post("/add-user", newUser)
//             .then((response) => {
//                 setUsers((prevState) => [...prevState, response.data]);
//                 setNewUser({});
//                 setShow(false);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//
//         userNameRef.current.focus();
//     };
//
//     function handleInputChange(e) {
//         const {name, value} = e.target;
//         if (name === 'quantity' && !validateInput(value)) {
//             return; //
//         }
//         setNewUser(prevState => ({...prevState, [name]: value}));
//     }
//
//     function validateInput(value) {
//         const regex = /^[1-9]\d*$/; // Only allow positive integers not starting with 0
//         return regex.test(value);
//     }
//
//     return (
//         <>
//             <Button
//                 size="lg"
//                 variant="primary"
//                 className={"mb-4"}
//                 onClick={handleShow}
//             >
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
//                         <FloatingLabel label="User Name">
//                             <Form.Control
//                                 ref={userNameRef}
//                                 name="name"
//                                 type="text"
//                                 placeholder="User Name"
//                                 value={newUser.name || ""}
//                                 onChange={handleInputChange}
//                             />
//                         </FloatingLabel>
//                         <FloatingLabel label="User Quantity">
//                             <Form.Control
//                                 name="email"
//                                 type="email"
//                                 placeholder="User Email"
//                                 value={newUser.email || ''}
//                                 onChange={handleInputChange}
//                             />
//                         </FloatingLabel>
//                         <FloatingLabel label="User Phone Number">
//                             <Form.Control
//                                 name="phone"
//                                 type="number"
//                                 placeholder="Prouduct Quantity"
//                                 value={newUser.phone || ''}
//                                 onChange={handleInputChange}
//                             />
//                         </FloatingLabel>
//                         <FloatingLabel label="User Quantity">
//                             <Form.Control
//                                 name="image"
//                                 type="file"
//                                 value={newUser.image || ''}
//                                 onChange={handleInputChange}
//                             />
//                         </FloatingLabel>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button onClick={handleAddUser}>
//                         Add User
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }
//
// export default AddUser;