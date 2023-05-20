import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import styles from './BreadcrumbExample.module.scss'
import classNames from "classnames/bind";
import {Link, useLocation} from "react-router-dom";

const cx = classNames.bind(styles)

function BreadcrumbExample() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Breadcrumb className={cx('breadcrumb')}>
            <Breadcrumb.Item
                linkAs={Link}
                linkProps={{to: '/'}}
            >
                Home
            </Breadcrumb.Item>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                    // <Link to={routeTo}>{capitalizeFirstLetter(name)}</Link>
                    <Breadcrumb.Item
                        key={index}
                        linkAs={Link}
                        linkProps={{to: routeTo}}
                        active={index === pathnames.length - 1}
                    >
                        {capitalizeFirstLetter(name)}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>

        // <div className={cx('breadcrumb')}>
        //     <Link to="/">Home</Link>
        //     {pathnames.map((name, index) => {
        //         const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        //         return (
        //             <span key={index}>
        //                 &nbsp;/&nbsp;
        //                 {/*<Link to={routeTo}>{capitalizeFirstLetter(name)}</Link>*/}
        //                 {capitalizeFirstLetter(name)}
        //             </span>
        //         );
        //     })}
        // </div>
    );
}

export default BreadcrumbExample;