import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteModal({show, handleClose, handleDelete}) {

    const handleConfirmDelete = () => {
        handleDelete();
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={"static"}
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;