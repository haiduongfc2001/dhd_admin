// import React, {useContext, useEffect, useState} from 'react';
// import {
//     MDBBtn,
//     MDBCard,
//     MDBCardBody,
//     MDBInput,
// }
//     from 'mdb-react-ui-kit';
// import {useNavigate} from 'react-router-dom';
// import api from "~/api/api";
// import { AuthContext } from '~/context/AuthContext';
//
//
// function SignIn() {
//     const { setIsLoggedIn } = useContext(AuthContext);
//     const navigate = useNavigate();
//
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//
//
//     useEffect(() => {
//         setErrMsg('');
//     }, [email, password]);
//
//     useEffect(() => {
//         setErrMsg('');
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsLoggedIn(true);
//             navigate('/');
//         }
//     }, [setIsLoggedIn, navigate]);
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//
//         try {
//             const response = await api.post('/admin/login', {
//                     email,
//                     password
//                 }
//             );
//             const token = response.data.token;
//             localStorage.setItem('token', token);
//
//             setIsLoggedIn(true);
//             navigate('/');
//
//         } catch (err) {
//                 setErrMsg('Login Failed');
//         }
//     };
//
//     return (
//         <MDBCard>
//             <MDBCardBody>
//                 <MDBInput
//                     type='email'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <MDBInput
//                     type={password}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <MDBBtn onClick={handleLogin}>
//                     Login
//                 </MDBBtn>
//             </MDBCardBody>
//         </MDBCard>
//     );
// }
//
// export default SignIn;