// import {Modal, Form, FloatingLabel} from "react-bootstrap";
// import React, {useState} from "react";
//
// const EditMovie = ({cx, movie}) => {
//     const [show, setShow] = useState(false);
//
//     const [title, setTitle] = useState("");
//     const [overview, setOverview] = useState('');
//
//     const [errorMessage, setErrorMessage] = useState('');
//
//     const handleTitleChange = (e) => {
//         setTitle(e.target.value);
//     };
//
//     const handleOverviewChange = (e) => {
//         setOverview(e.target.value);
//     };
//
//     const handleClose = () => {
//         setShow(false);
//         setErrorMessage('');
//     };
//
//     const editMovieForm = [
//         {
//             label: (
//                 <>
//                     Movie Name{" "}
//                     <span style={{color: "red"}} dangerouslySetInnerHTML={{__html: "*"}}/>
//                 </>
//             ),
//             type: "text",
//             id: "title",
//             value: title,
//             onChange: handleTitleChange,
//         },
//         {
//             label: (
//                 <>
//                     Movie Overview{" "}
//                     <span
//                         style={{color: "red"}}
//                         dangerouslySetInnerHTML={{__html: "*"}}
//                     />
//                 </>
//             ),
//             type: "text",
//             id: "overview",
//             value: overview,
//             onChange: handleOverviewChange,
//         }
//     ]
//
//     return (
//         <>
//             <Modal show={show} backdrop="static" centered onHide={handleClose}>
//                 <Modal.Body>
//                     <Form inline='true' className={cx('form-movie')}>
//                         {editMovieForm.map((form, index) => (
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
//             </Modal>
//         </>
//     );
// };
//
// export default EditMovie;
