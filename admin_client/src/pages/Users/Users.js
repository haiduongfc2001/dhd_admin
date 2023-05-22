import React, { useEffect, useState } from 'react';
import axios from "axios";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Button, Form, Table } from "react-bootstrap";
import { AiFillSave } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import DeleteProduct from "~/pages/Home/Products/DeleteProduct";

// import { Table } from "react-bootstrap";

import classNames from "classnames/bind";
import styles from "./Users.module.scss";
import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";
const cx = classNames.bind(styles);

export default function Users() {

    const [users, setUsers] = useState([]);
    const tableArray = ['User', 'UserID', 'Phone', 'Status', 'Actions'];
    const actionArray = [
        {
            type: 'button',
            className: 'btn btn-success',
            name: 'Edit',
        },
        {
            type: 'button',
            className: 'btn btn-danger',
            name: 'Delete',
        },
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    });


    return (
        <>
            <BreadcrumbExample />

            <MDBTable align='middle'>
                <MDBTableHead style={{backgroundColor: 'antiquewhite'}}>
                    <tr className={cx('table-product-category')}>
                        {tableArray.map((table, index) => (
                            <th key={index} scope='col'>{table}</th>
                        ))}
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src={`http://localhost:5000/userImages/${user.image}`}
                                        alt="{user.name}"
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>{user.name}</p>
                                        <p className='text-muted mb-0'>{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{user._id}</td>
                            <td>{user.phone}</td>
                            <td>
                                <MDBBadge
                                    style={{ fontSize: "var(--default-font-size)" }}

                                    color={user.is_admin === 1 && user.is_verified === 1 ? 'success'
                                        : user.is_verified === 0 ? 'danger'
                                            : 'info'}
                                    pill
                                >
                                    {user.is_admin === 1 && user.is_verified === 1 ? 'Admin'
                                        : user.is_admin === 0 && user.is_verified === 1 ? 'User'
                                            : 'Not Verified'
                                    }
                                </MDBBadge>

                            </td>
                            <td>
                                {actionArray.map((action, index) => (
                                    <button
                                        type={action.type}
                                        className={action.className}
                                        style={{ fontSize: "var(--default-font-size-button)" }}
                                        disabled={user.is_admin === 1 && user.is_verified === 1}
                                    >
                                        {action.name}
                                    </button>
                                ))}
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </>
    );
}


// <Table striped bordered hover>
//                 <thead>
//                     <tr className={cx('table-product-category')}>
//                         <th scope='col' style={{ width: '55px' }}>Avatar</th>
//                         <th scope='col'>UserID</th>
//                         <th scope='col'>UserName</th>
//                         <th scope='col'>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user._id}>
//                             <td style={{ width: '55px' }}>
//                                 <img
//                                     src={`http://localhost:5000/userImages/${user.image}`}
//                                     alt="{user.name}"
//                                     style={{ width: '45px', height: '45px' }}
//                                     className='rounded-circle'
//                                 />
//                             </td>
//                             <td style={{ textAlign: "center" }}>{user._id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>