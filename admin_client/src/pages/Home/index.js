import styles from './Home.module.scss'
import classNames from "classnames/bind"
import BreadcrumbExample from "~/pages/Home/BreadcrumbExample";
import ListProducts from "~/pages/Home/Products/Products";

const cx = classNames.bind(styles)

function Home() {
    return(
        <div className={cx('wrapper')}>
            <BreadcrumbExample />
            <ListProducts />
        </div>
    )
}

export default Home;