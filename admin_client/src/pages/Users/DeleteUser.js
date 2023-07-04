import {BsTrash} from "react-icons/bs";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import api from "~/api/api";

function DeleteUser ({cx, styles, user, users, setUsers}) {
    const [show, setShow] = useState(false);
    const [deleteUser, setDeleteUser] = useState(null);

    const handleClose = () => {
        setShow(false);
        setDeleteUser(null);
    }

    const handleShow = (id) => {
        setShow(true);
        setDeleteUser(id);
    };

    const handleDeleteUser = (id) => {
        api
            .delete(`/user/${id}`)
            .then(response => {
                setUsers(users.filter((user) => user._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleComfirmDelete = () => {
        handleDeleteUser(deleteUser);
        handleClose();
        toast.error('User deleted successfully!', {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
        });
    }

    return (
        <>
            <Button
                variant="danger"
                className={cx('button-delete')}
                disabled={user.is_admin === 1 && user.is_verified === 1}
                style={{fontSize: "var(--default-font-size-button)"}}
                onClick={() => handleShow(user._id)}
            >
                <BsTrash className={cx('icon-action')}/>
                {/*Delete*/}
            </Button>

            <Modal
                show={show}
                backdrop={"static"}
                keyboard={false}
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleComfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteUser;