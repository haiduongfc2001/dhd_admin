import React, {useState} from 'react';
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss"
import {FaBars, FaUserAlt, FaUserPlus} from "react-icons/fa";
import {BsFillCartCheckFill} from "react-icons/bs";
import {NavLink} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";
import {BiMoviePlay} from "react-icons/bi";

const cx = classNames.bind(styles)
const Sidebar = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const iconStyle = {
        className: cx('icon-sidebar'),
        style: {marginRight: isOpen ? '16px' : '0px'}
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
            text: "Orders",
            link: "/orders"
        },
        {
            icon: <FaUserPlus {...iconStyle}/>,
            text: "Supplier",
            link: "/supplier"
        }
    ];

    return (
        <div
            className={cx('wrapper')}
            style={{
                width: isOpen
                    ? 'var(--default-layout-sidebar-width)'
                    : 'var(--default-layout-sidebar-width-close)'
            }}
        >
            <div
                className={cx('inner')}
                style={{
                    margin: isOpen
                        ? 'var(--default-margin)'
                        : 'var(--default-margin-close)'
                }}
            >
                <div className={cx('toggle-bar', 'mb-3')}>
                    <FaBars onClick={toggle}/>
                </div>
                {buttons.map((button, index) => (
                    <NavLink to={button.link} key={index}>
                        <MDBBtn
                            className={cx('sidebar-menu', {'selected': selectedButton === index})}
                            onClick={() => setSelectedButton(index)}
                            style={
                                isOpen ? (
                                    {
                                        minWidth: 'calc(var(--default-layout-sidebar-width) - var(--default-margin) * 2)',
                                        fontSize: 'var(--default-font-size)'
                                    }
                                ) : (
                                    {
                                        minWidth: 'calc(var(--default-layout-sidebar-width-close) ' +
                                            '- (var(--default-margin-close) * 2))',
                                        fontSize: 'var(--default-font-size)',
                                        marginRight: '0px'
                                    }
                                )
                            }
                        >
                            {button.icon}
                            <div
                                className={cx('sidebar-category')}
                                style={
                                    isOpen ? (
                                        {fontSize: 'var(--default-font-size)'}
                                    ) : (
                                        {display: 'none'}
                                    )
                                }
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
