import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import styles from './Home.module.scss'
import classNames from "classnames/bind";

const cx= classNames.bind(styles)

function BreadcrumbExample() {
    return (
        <Breadcrumb className={cx('breadcrumb')}>
            <Breadcrumb.Item href="#">
                Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
                href="/"
                active
            >
                Products
            </Breadcrumb.Item>
            {/*<Breadcrumb.Item>*/}
            {/*    Data*/}
            {/*</Breadcrumb.Item>*/}
        </Breadcrumb>
    );
}

export default BreadcrumbExample;