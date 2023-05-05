import classNames from "classnames/bind";
import styles from "./SignIn.module.scss";
import {Button, Card, Form, InputGroup} from "react-bootstrap";
import logoDHD from "~/assets/images/logo_dhdadmin.png"
import {IoMdAddCircle} from "react-icons/io";

const cx = classNames.bind(styles)

function SignIn() {
    return (
        <div className={cx('wrapper')}>
            <Card style={{width: '18rem'}}>
                <Card.Img
                    variant="top"
                    src={logoDHD}
                    className={cx('logoadmin')}
                />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    {/*<Card.Text>*/}
                    {/*    Some quick example text to build on the card title and make up the*/}
                    {/*    bulk of the card's content.*/}
                    {/*</Card.Text>*/}

                    <Form inline className={cx('form-product')}>
                        <Form.Control
                            // ref={productNameRef}
                            name="product"
                            placeholder="Product name"
                            // value={newTodo.product || ''}
                            // onChange={handleInputChange}
                            className="mr-sm-2 mb-2"
                            size="lg"
                            style={{minHeight: "40px"}}
                        />
                        <Form.Control
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            // value={newTodo.quantity || ''}
                            // onChange={handleInputChange}
                            className="mr-sm-2 mb-2"
                            size="lg"
                            style={{minHeight: "40px"}}
                        />
                    </Form>
                    <Button variant="primary">Sign in</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SignIn;