import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import api from "~/api/api";
import {BsTrash} from "react-icons/bs";

const DeleteMovie = ({cx, movie, movies, setMovies}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [movieIdToDelete, setMovieIdToDelete] = useState(null);
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setMovieIdToDelete(null);
    };

    const handleShowDeleteModal = (id) => {
        setShowDeleteModal(true);
        setMovieIdToDelete(id);
    };

    const handleDeleteMovie = (id) => {
        api
            .delete(`/movie/${id}`)
            .then(response => {
                setMovies(movies.filter((movie) => movie._id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleConfirmDelete = () => {
        handleDeleteMovie(movieIdToDelete);
        handleCloseDeleteModal();
        toast.error('Movie deleted successfully!', {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
        });
    };

    return (
        <>
            <Button
                variant="danger"
                className={cx('button-delete')}
                style={{fontSize: "var(--default-font-size-button)"}}
                onClick={() => handleShowDeleteModal(movie._id)}
            >
                <BsTrash className={cx('icon-action')}/>
                {/*Delete*/}
            </Button>

            <Modal
                show={showDeleteModal}
                onHide={handleCloseDeleteModal}
                backdrop={"static"}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this movie?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )


}

export default DeleteMovie;