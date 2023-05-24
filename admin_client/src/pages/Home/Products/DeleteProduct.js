import {BsTrash} from "react-icons/bs";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import api from "~/api/api";


const DeleteProduct = ({cx, product, products, setProducts}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setProductIdToDelete(null);
    };

    const handleShowDeleteModal = (id) => {
        setShowDeleteModal(true);
        setProductIdToDelete(id);
    };

    const handleDeleteProduct = (id) => {
        api
            .delete(`/product/${id}`)
            .then(response => {
                setProducts(products.filter((product) => product._id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleConfirmDelete = () => {
        handleDeleteProduct(productIdToDelete);
        handleCloseDeleteModal();
        toast.error('Product deleted successfully!', {
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
                onClick={() => handleShowDeleteModal(product._id)}
            >
                <BsTrash className={cx('icon-action')}/>
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
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
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

export default DeleteProduct;