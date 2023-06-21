// import {Button, Modal, Form, ModalTitle, FloatingLabel} from "react-bootstrap";
// import {useState} from "react";
// import api from "~/api/api";
//
// const EditUser = ({cx, user}) => {
//     const [show, setShow] = useState(false);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
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
//         setName(user.name);
//         setEmail(user.email);
//         setPhone(user.phone);
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
//         // Tạo một đối tượng FormData để gửi dữ liệu
//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("email", email);
//         formData.append("phone", phone);
//         formData.append("image", image);
//
//         if (!name || !email || !phone || !image) {
//             return;
//         }
//
//         try {
//
//             const response = await api.put(`/user/${user._id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             const updatedUser = response.data;
//             handleClose();
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     const editUserForm = [
//         {
//             label: "User Name",
//             type: "text",
//             id: "name",
//             value: name,
//             onChange: handleNameChange,
//         },
//         {
//             label: "User Email",
//             type: "email",
//             id: "email",
//             value: email,
//             onChange: handleEmailChange,
//         },
//         {
//             label: "User Phone Number",
//             type: "number",
//             id: "phone",
//             value: phone,
//             onChange: handlePhoneChange,
//         },
//         {
//             label: "Avatar",
//             type: "file",
//             id: "image",
//             onChange: handleImageChange,
//         },
//     ]
//
//     return (
//         <>
//             <Button onClick={handleShow}>
//                 Edit
//             </Button>
//
//             <Modal show={show} centered onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <ModalTitle>Edit User</ModalTitle>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form inline="true" className={cx('form-user')}>
//                         {editUserForm.map((form, index) => (
//                             <FloatingLabel
//                                 key={index}
//                                 label={form.label}
//                             >
//                                 <Form.Control
//                                     type={form.type}
//                                     id={form.id}
//                                     value={form.value}
//                                     onChange={form.onChange}
//                                 />
//                             </FloatingLabel>
//                         ))}
//                         {
//                             user.image && (
//                                 <img
//                                     src={user.image}
//                                     alt={user.email}
//                                 />
//                             )
//                         }
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button onClick={handleEditUser}>
//                         Save
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };
//
// export default EditUser;
