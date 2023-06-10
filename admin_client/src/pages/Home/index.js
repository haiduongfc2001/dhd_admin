import styles from './Home.module.scss'
import classNames from "classnames/bind"
import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";
import ListMovies from "~/pages/Movies/Movies";

const cx = classNames.bind(styles)

function Home() {
    return(
        <div className={cx('wrapper')}>
            {/*<BreadcrumbExample />*/}
            <ListMovies />
        </div>
    )
}

export default Home;