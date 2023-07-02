// import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
// import React, {useState} from "react";
//
//
// const DetailsMovie = ({cx, movie}) => {
//     const [show, setShow] = useState(false);
//
//     const handleShow = () => {
//         setShow(true);
//     }
//
//     const handleClose = () => {
//         setShow(false);
//     }
//
//     const infoMovie = [
//         {
//             label: "ID",
//             type: "text",
//             id: "id",
//             value: movie.id,
//         },
//         {
//             label: "Tên phim",
//             type: "text",
//             id: "title",
//             value: movie.title,
//         },
//         {
//             label: "Số lượt đánh giá",
//             type: "text",
//             id: "vote_count_user",
//             value: movie.vote_count_user,
//         },
//         {
//             label: "Điểm trung bình",
//             type: "text",
//             id: "vote_average_user",
//             value: movie.vote_average_user,
//         },
//     ]
//
//     return (
//         <>
//             <p onClick={handleShow}>
//                 {movie.title}
//             </p>
//
//             <Modal show={show} centered onHide={handleClose}>
//                 <Modal.Body className={cx('modal-body')}>
//                     <Form inline='true' className={cx('form-movie')}>
//                         {infoMovie.map((form, index) => (
//                             <FloatingLabel
//                                 key={index}
//                                 label={form.label}
//                             >
//                                 <Form.Control
//                                     autoFocus={form.id === 'title'}
//                                     as={form.type === 'textarea' ? 'textarea' : undefined}
//                                     id={form.id}
//                                     value={form.value}
//                                 />
//                             </FloatingLabel>
//                         ))}
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }
//
// export default DetailsMovie;