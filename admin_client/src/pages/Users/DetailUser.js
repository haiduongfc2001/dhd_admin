import {Button, FloatingLabel, Form, Modal, ModalTitle} from "react-bootstrap";
import React, {useState} from "react";
import highlightKeyword from "~/components/highlightKeyword";
import api from "~/api/api";
import formatTime from "~/hooks/formatTime";


const DetailsUser = ({cx, user, searchTerm}) => {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const infoUser = [
        {
            label: "ID",
            type: "text",
            id: "id",
            value: user._id,
        },
        {
            label: "Tên người dùng",
            type: "text",
            id: "title",
            value: user.name,
        },
        {
            label: "Email",
            type: "text",
            id: "email",
            value: user.email,
        },
        {
            label: "Số điện thoại",
            type: "tel",
            id: "phone",
            value: user.phone,
        },
        {
            label: "Thời gian tạo tài khoản",
            type: "text",
            id: "register_createdAt",
            value: formatTime(user.createdAt),
        },
        {
            label: "Thời gian cập nhật hồ sơ gần nhất",
            type: "text",
            id: "updateProfile_updatedAt",
            value: formatTime(user.updatedAt),
        },
    ]

    return (
        <>
            <p
                className={cx('fw-bold', 'mb-1', 'limitLineClassName', 'user-info')}
                onClick={handleShow}
            >
                {highlightKeyword(user.name, searchTerm)}
            </p>

            <Modal show={show} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Thông tin chi tiết</ModalTitle>
                </Modal.Header>
                <Modal.Body className={cx('modal-body')}>
                    <Form inline='true' className={cx('form-user')}>
                        {user.image ? (
                            <img
                                src={`${api.defaults.baseURL}/userImages/${user.image}`}
                                alt={user.email}
                                style={{
                                    marginBottom: '10px',
                                    width: "150px",
                                    height: "225px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                        ) : (
                            <span>Không có ảnh</span>
                        )
                        }
                        {infoUser.map((form, index) => (
                            <FloatingLabel
                                key={index}
                                label={form.label}
                                className="mr-sm-2 mb-3"
                            >
                                <Form.Control
                                    autoFocus={form.id === 'email'}
                                    type={form.type}
                                    id={form.id}
                                    value={form.value}
                                    size="lg"
                                    style={{
                                        minHeight: '40px',
                                        borderRadius: 'var(--default-border-radius)'
                                    }}
                                    readOnly={true}
                                    required
                                />
                            </FloatingLabel>
                        ))}
                    </Form>
                    {
                        user.ratedMovies.length > 0 ? (
                            <div className={cx('info-user-ratings')}>
                                <h2>Rated Movies</h2>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>Movie Title</th>
                                        <th>Rating</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {user.ratedMovies.map((rated) => (
                                        <tr key={rated._id}>
                                            <td>{rated.movie?.title}</td>
                                            <td>{rated.rating}</td>
                                            <td>{formatTime(rated.createdAt)}</td>
                                            <td>{formatTime(rated.updatedAt)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <h2 style={{color: 'red'}}>Chưa đánh giá phim nào!</h2>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailsUser;