import React, {useEffect, useRef, useState} from 'react';

import {MDBBadge, MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';

import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";
import api from "~/api/api";
import AddUser from "~/pages/Users/AddUser";
import DeleteUser from "~/pages/Users/DeleteUser";
import EditUser from "~/pages/Users/EditUser";
import {ToastContainer} from "react-toastify";

import classNames from "classnames/bind";
import styles from "./Users.module.scss";
import formatTime from "~/hooks/formatTime";
const cx = classNames.bind(styles);

export default function Users() {

    const [users, setUsers] = useState([]);

    const tableArray = ['User', 'UserID', 'Phone', 'Status','Creat Time', 'Actions'];
    const actionArray = [
        {
            type: 'component',
            component: (user) => (
                <EditUser
                    cx={cx}
                    user={user}
                    // users={users}
                    // setUsers={setUsers}
                />
            )
        },
        {
            type: 'component',
            component: (user) => (
                <DeleteUser
                    cx={cx}
                    user={user}
                    users={users}
                    setUsers={setUsers}
                />
            ),
        },
    ];

    useEffect(() => {
        api.get('/users')
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    });


    return (
        <>
            <BreadcrumbExample/>

            <AddUser
                cx={cx}
                styles={styles}
                setUsers={setUsers}
            />

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
                                        src={`${api.defaults.baseURL}/userImages/${user.image}`}
                                        alt="{user.name}"
                                        style={{width: '45px', height: '45px'}}
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
                                    style={{fontSize: "var(--default-font-size)"}}

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
                                {formatTime(user.createdAt)}
                                <div>
                                    <span>Lần cập nhật gần nhất: </span>
                                    <br />
                                    {formatTime(user.updatedAt)};
                                </div>
                            </td>
                            <td>
                                {actionArray.map((action, index) => (
                                    <React.Fragment key={index}>
                                        {action.component(user)}
                                    </React.Fragment>
                                ))}
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
            <ToastContainer/>
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