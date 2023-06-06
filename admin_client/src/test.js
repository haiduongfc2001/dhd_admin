// import React, {useState} from 'react';
// import {Button, FloatingLabel, Form} from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
// import api from "~/api/api";
//
// function AddSupplier() {
//     const [show, setShow] = useState(false);
//
//     const [name, setName] = useState('');
//     const [country, setCountry] = useState('');
//
//     const handleNameChange = (e) => {
//         setName(e.target.value);
//     }
//
//     const handleCountryChange = (e) => {
//         setCountry(e.target.value);
//     }
//
//     const handleShow = () => {
//         setShow(true);
//     }
//
//     const handleClose = () => {
//         setShow(false);
//     }
//
//     const handleAddSupplier = async (e) => {
//         e.preventDefault();
//
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('country', country);
//
//         if (!name || !country) {
//             return;
//         }
//
//         try {
//
//             const response = await api.post('/supplier', formData);
//
//             setShow(false);
//             setName('');
//             setCountry('');
//
//         } catch (e) {
//             console.error(e);
//         }
//
//     }
//
//     const addSupplierForm = [
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
//                 Add
//             </Button>
//
//             <Modal
//                 show={show}
//                 onHide={handleClose}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add Supplier</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form inline='true'>
//                         {addSupplierForm.map((form, index) => (
//                             <FloatingLabel
//                                 key={index}
//                                 label={form.label}
//                             >
//                                 <Form.Control
//                                     autoFocus={form.id === "name"}
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
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button type="submit" onClick={handleAddSupplier}>
//                         Add Supplier
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }
//
// export default AddSupplier;