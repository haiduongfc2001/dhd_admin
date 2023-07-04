import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import api from "~/api/api";
import {BsTrash} from "react-icons/bs";

function DeleteCompany ({cx, company, companys, setCompanys}) {
    const [show, setShow] = useState(false);

    const [deleteCompany, setDeleteCompany] = useState(null);

    const handleClose = () => {
        setShow(false);
        setDeleteCompany(null);
    }

    const handleShow = (id) => {
        setShow(true);
        setDeleteCompany(id);
    };

    const handleDeleteCompany = (id) => {
        api
            .delete(`/company/${id}`)
            .then(response => {
                setCompanys(companys.filter((company) => company._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleComfirmDelete = () => {
        handleDeleteCompany(deleteCompany);
        handleClose();
        toast.error('Company deleted successfully!', {
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
                onClick={() => handleShow(company._id)}
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
                <Modal.Body>Are you sure you want to delete this company?</Modal.Body>
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

export default DeleteCompany;