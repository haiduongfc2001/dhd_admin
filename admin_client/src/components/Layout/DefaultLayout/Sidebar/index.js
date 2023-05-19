import React from 'react';
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss"
import {FaUserAlt, FaUserPlus} from "react-icons/fa";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {BsFillCartCheckFill} from "react-icons/bs";
import {NavLink} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";

const cx = classNames.bind(styles)
const Sidebar = () => {
    const buttons = [
        {icon: <AiOutlineShoppingCart className={cx('icon-sidebar')}/>, text: "Products", link: "/products"},
        {icon: <FaUserAlt className={cx('icon-sidebar')}/>, text: "Users", link: "/users"},
        {icon: <BsFillCartCheckFill className={cx('icon-sidebar')}/>, text: "Orders", link: "/orders"},
        {icon: <FaUserPlus className={cx('icon-sidebar')}/>, text: "Register", link: "/register"}
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {buttons.map((button, index) => (
                    <NavLink to={button.link} key={index}>
                        <MDBBtn className={cx('sidebar-menu')}>
                            {button.icon}
                            <span className={cx('sidebar-category')}>
                            {button.text}
                        </span>
                        </MDBBtn>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
