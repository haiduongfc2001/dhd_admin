import styles from '../Home/Home.module.scss'
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

const Orders = () => {

    return (
        <div className={cx('wrapper')}>
            <h1>This is Orders Page</h1>
        </div>
    )

}

export default Orders;