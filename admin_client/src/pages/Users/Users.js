import React, {useEffect, useState} from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {AiFillSave} from "react-icons/ai";
import {GiCancel} from "react-icons/gi";
import {HiPencilAlt} from "react-icons/hi";
import DeleteProduct from "~/pages/Home/Products/DeleteProduct";

import classNames from "classnames/bind";
import styles from "./Users.module.scss";
const cx = classNames.bind(styles);

export default function Users() {

    const [users, setUsers] = useState([]);

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
        <Table striped bordered hover>
            <thead>
            <tr className={cx('table-product-category')}>
                <th>UserID</th>
                <th>UserName</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user._id}>
                    <td style={{textAlign: "center"}}>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        
        // <MDBTable align='middle'>
        //     <MDBTableHead>
        //         <tr>
        //             <th scope='col'>Name</th>
        //             <th scope='col'>Title</th>
        //             <th scope='col'>Status</th>
        //             <th scope='col'>Position</th>
        //             <th scope='col'>Actions</th>
        //         </tr>
        //     </MDBTableHead>
        //     <MDBTableBody>
        //         <tr>
        //             <td>
        //                 <div className='d-flex align-items-center'>
        //                     <img
        //                         src='https://mdbootstrap.com/img/new/avatars/8.jpg'
        //                         alt=''
        //                         style={{ width: '45px', height: '45px' }}
        //                         className='rounded-circle'
        //                     />
        //                     <div className='ms-3'>
        //                         <p className='fw-bold mb-1'>John Doe</p>
        //                         <p className='text-muted mb-0'>john.doe@gmail.com</p>
        //                     </div>
        //                 </div>
        //             </td>
        //             <td>
        //                 <p className='fw-normal mb-1'>Software engineer</p>
        //                 <p className='text-muted mb-0'>IT department</p>
        //             </td>
        //             <td>
        //                 <MDBBadge color='success' pill>
        //                     Active
        //                 </MDBBadge>
        //             </td>
        //             <td>Senior</td>
        //             <td>
        //                 <MDBBtn color='link' rounded size='lg'>
        //                     Edit
        //                 </MDBBtn>
        //             </td>
        //         </tr>
        //         <tr>
        //             <td>
        //                 <div className='d-flex align-items-center'>
        //                     <img
        //                         src='https://mdbootstrap.com/img/new/avatars/6.jpg'
        //                         alt=''
        //                         style={{ width: '45px', height: '45px' }}
        //                         className='rounded-circle'
        //                     />
        //                     <div className='ms-3'>
        //                         <p className='fw-bold mb-1'>Alex Ray</p>
        //                         <p className='text-muted mb-0'>alex.ray@gmail.com</p>
        //                     </div>
        //                 </div>
        //             </td>
        //             <td>
        //                 <p className='fw-normal mb-1'>Consultant</p>
        //                 <p className='text-muted mb-0'>Finance</p>
        //             </td>
        //             <td>
        //                 <MDBBadge color='primary' pill>
        //                     Onboarding
        //                 </MDBBadge>
        //             </td>
        //             <td>Junior</td>
        //             <td>
        //                 <MDBBtn color='link' rounded size='lg'>
        //                     Edit
        //                 </MDBBtn>
        //             </td>
        //         </tr>
        //         <tr>
        //             <td>
        //                 <div className='d-flex align-items-center'>
        //                     <img
        //                         src='https://mdbootstrap.com/img/new/avatars/7.jpg'
        //                         alt=''
        //                         style={{ width: '45px', height: '45px' }}
        //                         className='rounded-circle'
        //                     />
        //                     <div className='ms-3'>
        //                         <p className='fw-bold mb-1'>Kate Hunington</p>
        //                         <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
        //                     </div>
        //                 </div>
        //             </td>
        //             <td>
        //                 <p className='fw-normal mb-1'>Designer</p>
        //                 <p className='text-muted mb-0'>UI/UX</p>
        //             </td>
        //             <td>
        //                 <MDBBadge color='warning' pill>
        //                     Awaiting
        //                 </MDBBadge>
        //             </td>
        //             <td>Senior</td>
        //             <td>
        //                 <MDBBtn color='link' rounded size='lg'>
        //                     Edit
        //                 </MDBBtn>
        //             </td>   
        //         </tr>
        //     </MDBTableBody>
        // </MDBTable>
    );
}