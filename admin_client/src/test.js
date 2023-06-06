// import {Button, Modal, Form, ModalTitle, FloatingLabel} from "react-bootstrap";
// import {useEffect, useState} from "react";
// import api from "~/api/api";
//
// const EditSupplier = ({cx, supplier}) => {
//     const [show, setShow] = useState(false);
//
//     const [name, setName] = useState("");
//     const [country, setCountry] = useState("");
//
//     const handleNameChange = (e) => {
//         setName(e.target.value);
//     };
//
//     const handleCountryChange = (e) => {
//         setCountry(e.target.value);
//     };
//
//     const handleShow = () => {
//         setName(supplier.name);
//         setCountry(supplier.country);
//         setShow(true);
//     };
//
//     const handleClose = () => {
//         setShow(false);
//     };
//
//     const handleEditSupplier = async (e) => {
//         e.preventDefault();
//
//         // Tạo một đối tượng FormData để gửi dữ liệu
//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("country", country);
//
//         try {
//             const response = await api.put(`/supplier/${supplier._id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             const updatedSupplier = response.data;
//             handleClose();
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     useEffect(() => {
//         setName(supplier.name);
//         setCountry(supplier.country);
//     }, [supplier]);
//
//     const editSupplierForm = [
//         {
//             label: 'Supplier Name',
//             type: "text",
//             id: "name",
//             value: name,
//             onChange: handleNameChange,
//         },
//         {
//             label: 'Supplier Country',
//             type: "text",
//             id: "country",
//             value: country,
//             onChange: handleCountryChange,
//         },
//     ]
//
//     return (
//         <>
//             <Button onClick={handleShow}>
//                 Edit
//             </Button>
//
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <ModalTitle>Edit Supplier</ModalTitle>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         {editSupplierForm.map((form, index) => (
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
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button onClick={handleEditSupplier}>
//                         Save
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };
//
// export default EditSupplier;
