// import React, {useState} from 'react';
//
// import {MDBTable, MDBTableBody } from 'mdb-react-ui-kit';
//
// import classNames from "classnames/bind";
// import styles from "./Users.module.scss";
// import DeleteUser from "~/pages/Users/DeleteUser";
// const cx = classNames.bind(styles);
//
// export default function Users() {
//
//     const [users, setUsers] = useState([]);
//
//     const actionArray = [
//         {
//             type: 'button',
//             className: 'btn btn-success',
//             name: 'Edit',
//         },
//         {
//             type: 'button',
//             className: 'btn btn-danger',
//             name: 'Add',
//         },
//     ];
//
//
//     return (
//         <>
//             <MDBTable>
//                 <MDBTableBody>
//                     {users.map((user) => (
//                         <tr key={user._id}>
//                             <td>
//                                 {actionArray.map((action, index) => (
//                                     <button
//                                         type={action.type}
//                                         key={index}
//                                         className={action.className}
//                                         disabled={user.is_admin === 1 && user.is_verified === 1}
//                                     >
//                                         {action.name}
//                                     </button>
//                                 ))}
//
//
//                             </td>
//                         </tr>
//                     ))}
//                 </MDBTableBody>
//             </MDBTable>
//         </>
//     );
// }