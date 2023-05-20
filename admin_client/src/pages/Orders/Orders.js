import styles from '../Home/Home.module.scss'
import classNames from "classnames/bind"
import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";

const cx = classNames.bind(styles)

const Orders = () => {

    return (
        <div className={cx('wrapper')}>
            <BreadcrumbExample />
            <h1>This is Orders Page</h1>
        </div>
    )

}

export default Orders;