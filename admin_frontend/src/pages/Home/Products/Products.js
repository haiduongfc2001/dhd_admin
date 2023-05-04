import {useState} from "react";
import {Table, Form, Button} from 'react-bootstrap';
import {BsTrash} from 'react-icons/bs';
import {IoMdAddCircle} from 'react-icons/io';
import {HiPencilAlt} from "react-icons/hi";
import classNames from "classnames/bind"
import styles from "./Product.module.scss"

const cx = classNames.bind(styles)


function ListProducts() {
    const [todos, setTodos] = useState([
        {id: 1, product: 'Product 1', quantity: 5},
        {id: 2, product: 'Product 2', quantity: 10},
        {id: 3, product: 'Product 3', quantity: 3},
    ]);
    const [newTodo, setNewTodo] = useState({});

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setNewTodo({
            ...newTodo,
            [name]: value,
        });
    };

    const handleAddTodo = () => {
        const id = todos.length + 1;
        setTodos([...todos, {id, ...newTodo}]);
        setNewTodo({});
    };

    const handleUpdateTodo = (id, newProduct, newQuantity) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                return {...todo, product: newProduct, quantity: newQuantity};
            }
            return todo;
        }));
    }


    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.product}</td>
                        <td>{todo.quantity}</td>
                        <td>
                            <Button
                                variant="warning"
                                onClick={() => handleUpdateTodo(todo.id)}
                                className={cx('button-update')}
                            >
                                <HiPencilAlt className={cx('icon-update')}/>
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteTodo(todo.id)}
                                className={cx('button-delete')}
                            >
                                <BsTrash className={cx('icon-delete')}/>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Form inline>
                <Form.Control name="product" placeholder="Product name" value={newTodo.product || ''}
                              onChange={handleInputChange} className="mr-sm-2 mb-2" style={{minHeight: "40px"}}/>
                <Form.Control name="quantity" type="number" placeholder="Quantity" value={newTodo.quantity || ''}
                              onChange={handleInputChange} className="mr-sm-2 mb-2" style={{minHeight: "40px"}}/>
                <Button variant="primary" onClick={handleAddTodo}>
                    <IoMdAddCircle/>
                </Button>
            </Form>
        </>
    );
}

export default ListProducts;