import React, { useEffect, useState } from 'react';

import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import api from "~/api/api";

export default function Users() {

    const [users, setUsers] = useState([]);
    const tableArray = ['User', 'UserID', 'Phone', 'Status', 'Actions'];

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
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        {tableArray.map((table, index) => (
                            <th key={index}>{table}</th>
                        ))}
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <div>
                                    <img
                                        src={`/userImages/${user.image}`}
                                        alt="{user.name}"
                                    />
                                    <div>
                                        <p>{user.name}</p>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </>
    );
}