import {useState} from "react";
import {Table, Form, Button} from 'react-bootstrap';
import {BsTrash} from 'react-icons/bs';
import {IoMdAddCircle} from 'react-icons/io';
import {HiPencilAlt} from "react-icons/hi";

function ListProducts() {
    const [todos, setTodos] = useState([
        {id: 1, product: 'Product 1', quantity: 5},
        {id: 2, product: 'Product 2', quantity: 10},
        {id: 3, product: 'Product 3', quantity: 3},
    ]);
    const [newTodo, setNewTodo] = useState({});

    const handleUpdateTodo = () => {
        // incomplete
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
                            <Button variant="warning" onClick={() => handleUpdateTodo(todo.id)}>
                                <HiPencilAlt/>
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteTodo(todo.id)}>
                                <BsTrash/>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default ListProducts;