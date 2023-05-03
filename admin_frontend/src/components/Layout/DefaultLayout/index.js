import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"
import Sidebar from "./Sidebar";
import Header from "~/components/Layout/components/Header";

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div>
            <Header/>
            <div className={"container"}>
                <Sidebar/>
                <div className={"content"}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout;