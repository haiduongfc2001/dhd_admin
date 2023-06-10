import {Button, Modal, Form, ModalTitle, FloatingLabel} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "~/api/api";

const EditMovie = ({cx, movie}) => {
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState("");
    const [overview, setOverview] = useState('');
    const [poster_path, setPoster_Path] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleOverviewChange = (e) => {
        setOverview(e.target.value);
    };

    const handlePoster_PathChange = (e) => {
        setPoster_Path(e.target.value);
    };

    const handleShow = () => {
        setTitle(movie.title);
        setOverview(movie.overview);
        setPoster_Path(movie.poster_path);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setErrorMessage('');
    };

    const handleEditMovie = async (e) => {
        e.preventDefault();

        if (!title) {
            setErrorMessage('Xin nhập tên của nhà sản xuất!');
            return;
        } else if (!overview) {
            setErrorMessage('Xin nhập vào trường overview');
            return;
        } else if (!poster_path) {
            setErrorMessage('Xin nhập vào trường poster_path!');
            return;
        }

        try {
            console.log('MovieID: ', movie._id);

            const response = await api.put(`/movie/${movie._id}`, {
                title,
                overview,
                poster_path,
            });

            const updatedMovie = response.data;
            // Handle the updated movie data here or close the modal
            console.log("Updated Movie:", updatedMovie);

            handleClose();
            setErrorMessage('');

            toast.success(`Movie ${title} has been updated!`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.log(error);
            toast.error('Error adding movie!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const editMovieForm = [
        {
            label: (
                <>
                    Movie Name{" "}
                    <span style={{color: "red"}} dangerouslySetInnerHTML={{__html: "*"}}/>
                </>
            ),
            type: "text",
            id: "title",
            value: title,
            onChange: handleTitleChange,
        },
        {
            label: (
                <>
                    Movie Overview{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            type: "text",
            id: "overview",
            value: overview,
            onChange: handleOverviewChange,
        },
        {
            label: (
                <>
                    Movie Poster Path{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            type: "text",
            id: "poster_path",
            value: poster_path,
            onChange: handlePoster_PathChange,
        },
    ]

    return (
        <>
            <Button
                variant="success"
                className={cx('button-delete')}
                style={{fontSize: "var(--default-font-size-button)"}}
                onClick={handleShow}
            >
                Edit
            </Button>

            <Modal show={show} backdrop="static" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Edit Movie</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}

                    <Form inline='true' className={cx('form-movie')}>
                        {editMovieForm.map((form, index) => (
                            <FloatingLabel
                                key={index}
                                label={form.label}
                                className="mr-sm-2 mb-3"
                            >
                                <Form.Control
                                    autoFocus={form.id === 'title'}
                                    type={form.type}
                                    id={form.id}
                                    value={form.value}
                                    onChange={form.onChange}
                                    size="lg"
                                    style={{minHeight: "40px"}}
                                    required
                                />
                            </FloatingLabel>
                        ))}
                        {movie.poster_path  ? (
                            <img
                                src={movie.poster_path}
                                alt={movie.title}
                                style={{width: "125px", height: "60px"}}
                            />
                        ) : (
                            <span>Không có ảnh</span>
                        )
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleEditMovie}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditMovie;
