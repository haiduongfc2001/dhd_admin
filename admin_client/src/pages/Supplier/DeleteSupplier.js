import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import api from "~/api/api";

function DeleteSupplier ({cx, supplier, suppliers, setSuppliers}) {
    const [show, setShow] = useState(false);
    
    const [deleteSupplier, setDeleteSupplier] = useState(null);

    const handleClose = () => {
        setShow(false);
        setDeleteSupplier(null);
    }

    const handleShow = (id) => {
        setShow(true);
        setDeleteSupplier(id);
    };

    const handleDeleteSupplier = (id) => {
        api
            .delete(`/supplier/${id}`)
            .then(response => {
                setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleComfirmDelete = () => {
        handleDeleteSupplier(deleteSupplier);
        handleClose();
        toast.error('Supplier deleted successfully!', {
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
                style={{fontSize: "var(--default-font-size-button)"}}
                onClick={() => handleShow(supplier._id)}
            >
                {/*<BsTrash className={cx('icon-action')}/>*/}
                Delete
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
                <Modal.Body>Are you sure you want to delete this supplier?</Modal.Body>
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

export default DeleteSupplier;