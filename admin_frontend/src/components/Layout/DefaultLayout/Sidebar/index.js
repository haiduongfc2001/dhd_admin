import React from 'react';
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss"
import {FaUserAlt, FaUserPlus} from "react-icons/fa";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {Button} from "react-bootstrap";
import {BsFillCartCheckFill} from "react-icons/bs";

const cx = classNames.bind(styles)
const Sidebar = () => {
    const buttons = [
        {icon: <AiOutlineShoppingCart className={cx('icon-sidebar')}/>, text: "Products"},
        {icon: <FaUserAlt className={cx('icon-sidebar')}/>, text: "Users"},
        {icon: <BsFillCartCheckFill className={cx('icon-sidebar')}/>, text: "Orders"},
        {icon: <FaUserPlus className={cx('icon-sidebar')}/>, text: "Register"}
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {buttons.map((button, index) => (
                    <Button key={index} className={cx('sidebar-menu')}>
                        {button.icon}
                        <span className={cx('sidebar-category')}>
                            {button.text}
                        </span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
