import React from 'react';
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss"
import {FaUserAlt} from "react-icons/fa";
import {AiOutlineShoppingCart} from "react-icons/ai";

const cx = classNames.bind(styles)
const Sidebar = () => {
    return (
        <div className={cx('wrapper')}>
            <div>
                <FaUserAlt />
                <span className={cx('sidebar-users')}>
                    Users
                </span>
            </div>
            <div>
                <AiOutlineShoppingCart />
                <span className={cx('sidebar-users')}>
                    Products
                </span>
            </div>
        </div>
    );
};

export default Sidebar;
