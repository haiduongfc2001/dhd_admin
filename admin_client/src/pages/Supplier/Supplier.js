import React, {useEffect, useRef, useState} from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '~/api/api'
import {Table} from 'react-bootstrap';

import AddSupplier from "./AddSupplier"
import DeleteSupplier from "./DeleteSupplier";
import EditSupplier from "./EditSupplier";

import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";

import classNames from "classnames/bind"
import styles from "./Supplier.module.scss"
const cx = classNames.bind(styles)

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        api.get('/suppliers')
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    const actionArray = [
        {
            type: 'component',
            component: (supplier) => (
                <EditSupplier
                    cx={cx}
                    supplier={supplier}
                />
            ),
        },
        {
            type: 'component',
            component: (supplier) => (
                <DeleteSupplier
                    cx={cx}
                    supplier={supplier}
                    suppliers={suppliers}
                    setSuppliers={setSuppliers}
                />
            ),
        },
    ]

    return (
        <>
            <BreadcrumbExample/>
            <AddSupplier
                cx={cx}
            />

            <Table striped bordered hover>
                <thead>
                <tr style={{backgroundColor: 'antiquewhite'}} className={cx('table-supplier-category')}>
                    <th style={{ maxWidth: '215px', width: '215px' }}>Supplier ID</th>
                    <th>Supplier Logo</th>
                    <th>Supplier Name</th>
                    <th>Supplier Country</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {suppliers.map((supplier) => (
                    <tr key={supplier._id}>
                        <td style={{textAlign: "center"}}>{supplier._id}</td>
                        <td>
                            {supplier.image && (
                                <img
                                    src={supplier.image}
                                    alt={supplier.name}
                                    className={cx('supplier-image')}
                                />
                            )}
                        </td>
                        <td>{supplier.name}</td>
                        <td>{supplier.country}</td>
                        <td>
                            {actionArray.map((action, index) => (
                                <React.Fragment key={index}>
                                    {action.component(supplier)}
                                </React.Fragment>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <ToastContainer/>
        </>
    );
}

export default Suppliers;

