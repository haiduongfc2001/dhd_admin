// import {Button, FloatingLabel, Modal, Form, ModalTitle} from "react-bootstrap";
// import {useEffect, useRef, useState} from "react";
// import {toast} from "react-toastify";
// import api from "~/api/api";
//
// const EditUser = () => {
//     const [show, setShow] = useState(false);
//
//     const [name, setName] = useState(user.name);
//     const [email, setEmail] = useState(user.email);
//     const [phone, setPhone] = useState(user.phone);
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
//     const handleShow = () => {
//         setShow(true);
//     };
//
//     const handleClose = () => {
//         setShow(false);
//     };
//
//     const handleEditUser = async (e) => {
//         e.preventDefault();
//
//         try {
//             const formData = new FormData();
//             formData.append('name', name);
//             formData.append('email', email);
//             formData.append('phone', phone);
//             formData.append('image', image);
//
//             const response = await api.put(`/user/${user._id}`, formData);
//             const updatedUser = response.data;
//
//             // Handle the updated user data here or close the modal
//             console.log('Updated User:', updatedUser);
//             handleClose();
//             toast.success(`User ${formData.name} has been updated!`, {
//                 position: "bottom-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });
//         } catch (error) {
//             console.log(error);
//             toast.error("An error occurred while updating user information.");
//         }
//     };
//
//     useEffect(() => {
//         setName(user.name);
//         setEmail(user.email);
//         setPhone(user.phone);
//     }, [user]);
//
//     return (
//         <>
//             <Button
//                 variant="success"
//                 style={{fontSize: "var(--default-font-size-button)"}}
//                 onClick={handleShow}
//             >
//                 Edit
//             </Button>
//
//             <Modal show={show} backdrop="static" centered onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <ModalTitle>Edit User</ModalTitle>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form onSubmit={handleEditUser}>
//                         <label>Name:</label>
//                         <input type="text" value={name} onChange={handleNameChange} />
//
//                         <label>Email:</label>
//                         <input type="email" value={email} onChange={handleEmailChange} />
//
//                         <label>Phone:</label>
//                         <input type="tel" value={phone} onChange={handlePhoneChange} />
//
//                         <label>Image:</label>
//                         <input type="file" onChange={handleImageChange} />
//
//                         <button type="submit">Save</button>
//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="success" onClick={handleEditUser}>
//                         Save
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };
//
// export default EditUser;
