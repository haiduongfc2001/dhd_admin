import React, {useState} from 'react';
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss"
import {FaBars, FaUserAlt, FaUserPlus} from "react-icons/fa";
import {BsFillCartCheckFill} from "react-icons/bs";
import {NavLink} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";
import {BiMoviePlay} from "react-icons/bi";
import {AiFillStar} from "react-icons/ai";

const cx = classNames.bind(styles)
const Sidebar = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const iconStyle = {
        className: cx('icon-sidebar', { close: !isOpen }),
        // style: {marginRight: isOpen ? '16px' : '0px'}
    };

    const buttons = [
        {
            icon: <BiMoviePlay {...iconStyle}/>,
            text: "Movies",
            link: "/movies"
        },
        {
            icon: <FaUserAlt {...iconStyle}/>,
            text: "Users",
            link: "/users"
        },
        {
            icon: <BsFillCartCheckFill {...iconStyle}/>,
            text: "Companies",
            link: "/companies"
        },
        {
            icon: <AiFillStar {...iconStyle}/>,
            text: "Ratings",
            link: "/ratings"
        }
        // {
        //     icon: <FaUserPlus {...iconStyle}/>,
        //     text: "Supplier",
        //     link: "/supplier"
        // }
    ];

    return (
        <div
            className={cx('wrapper', { close: !isOpen })}
        >
            <div className={cx('inner', { close: !isOpen })}>
                <div className={cx('toggle-bar', 'mb-3')}>
                    <FaBars onClick={toggle}/>
                </div>
                {buttons.map((button, index) => (
                    <NavLink to={button.link} key={index}>
                        <MDBBtn
                            className={cx('sidebar-menu', { close: !isOpen }, {'selected': selectedButton === index})}
                            onClick={() => setSelectedButton(index)}
                        >
                            {button.icon}
                            <div
                                className={cx('sidebar-category', { close: !isOpen })}
                            >
                                {button.text}
                            </div>
                        </MDBBtn>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
