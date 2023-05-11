import classNames from "classnames/bind";
import styles from "./Header.module.scss"
import Tippy from '@tippyjs/react/headless';
import logoDHD from "~/assets/images/logo_dhdadmin.png"
import {BiBell} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faMagnifyingGlass, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

const cx = classNames.bind(styles)

function Header(props) {
    const [searchResult, setSearchResult] = useState([]);

    const handleLogout = () => {
        axios.post('http://localhost:5000/admin/logout')
            .then(response => {
                // Redirect the user to the login page after successfully logging out
                window.location.href = "/admin/signin";
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img
                    src={logoDHD}
                    alt="logo dhd"
                    className={cx('logoadmin')}
                />
                <Tippy
                    visible={searchResult.length > 0}
                    render={attrs => (
                        <div className={cx('search-results')} tabIndex={-1} {...attrs}>
                            Kết quả
                        </div>
                    )
                    }
                >
                    <div className={cx('search')}>
                        <input
                            placeholder="Search ..."
                            spellCheck={false}
                        />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark}/>
                        </button>
                        {/*Loading*/}
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </Tippy>
                <div className={cx('')}>
                    <BiBell className={cx('icon-bell')}/>
                    <div className={'ms-3'}>
                        <Button
                            // variant={'outline-primary'}
                            className={cx('logout')}
                            size={'lg'}
                            onClick={handleLogout}
                        >
                            <FiLogOut className={cx('icon-logout')}/>
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;