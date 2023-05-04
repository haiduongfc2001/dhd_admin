import React from 'react';
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss"
import {FaUserAlt, FaUserPlus} from "react-icons/fa";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {Button} from "react-bootstrap";
import {BsFillCartCheckFill} from "react-icons/bs";

const cx = classNames.bind(styles)
const Sidebar = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Button className={cx('sidebar-menu-users', 'selected')}>
                    <FaUserAlt className={cx('icon-users')}/>
                    <span className={cx('sidebar-users')}>
                        Users
                    </span>
                </Button>
                <Button className={cx('sidebar-menu-products')}>
                    <AiOutlineShoppingCart className={cx('icon-products')}/>
                    <span className={cx('sidebar-products')}>
                        Products
                    </span>
                </Button>
                <Button className={cx('sidebar-menu-orders')}>
                    <BsFillCartCheckFill className={cx('icon-orders')}/>
                    <span className={cx('sidebar-orders')}>
                        Orders
                    </span>
                </Button>
                <Button className={cx('sidebar-menu-register')}>
                    <FaUserPlus className={cx('icon-register')}/>
                    <span className={cx('sidebar-register')}>
                        Register
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
