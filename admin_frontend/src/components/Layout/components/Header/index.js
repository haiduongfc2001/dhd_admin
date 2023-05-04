import classNames from "classnames/bind";
import styles from "./Header.module.scss"
import {Button, Stack} from "react-bootstrap";
import logoDHD from "~/assets/images/logo_dhdadmin.png"
import {BiBell} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";

const cx = classNames.bind(styles)

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img
                    src={logoDHD}
                     alt="logo dhd"
                    className={cx('logoadmin')}
                />
                {/*<Stack direction="horizontal" gap={2}>*/}
                {/*    <Button as="a" variant="primary">*/}
                {/*        Button as link*/}
                {/*    </Button>*/}
                {/*    <Button as="a" variant="success">*/}
                {/*        Button as link*/}
                {/*    </Button>*/}
                {/*</Stack>*/}
                {/*Content Header*/}

                <div className={cx('')}>
                    <BiBell className={cx('icon-bell')}/>
                    <div>
                        <FiLogOut className={cx('icon-logout')}/>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;