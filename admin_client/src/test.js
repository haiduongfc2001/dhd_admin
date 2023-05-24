// import React, {useContext, useEffect, useRef, useState} from 'react';
// import {
//     MDBBtn,
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBCard,
//     MDBCardBody,
//     MDBInput,
// }
//     from 'mdb-react-ui-kit';
// import usePasswordToggle from "~/hooks/usePasswordToggle";
// import classNames from "classnames/bind";
// import styles from "./SignIn.module.scss";
// import logoDHD from "~/assets/images/logo_dhdadmin.png";
//
// import {useNavigate} from 'react-router-dom';
// import {createBrowserHistory} from 'history';
// import api from "~/api/api";
// import {AuthContext} from '~/context/AuthContext';
// import {toast} from "react-toastify";
// import Home from "~/pages/Home";
//
// const history = createBrowserHistory();
//
// const cx = classNames.bind(styles)
//
//
// function SignIn() {
//     const {setIsLoggedIn} = useContext(AuthContext);
//     const navigate = useNavigate();
//
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//     const errRef = useRef();
//
//     const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle();
//
//     useEffect(() => {
//         setErrMsg('');
//     }, [email, password]);
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
//
//             const token = response.data.token;
//             localStorage.setItem('token', token);
//
//             setIsLoggedIn(true);
//             navigate('/');
//
//         } catch (err) {
//             errRef.current.focus();
//             toast.error('Login failed!');
//         }
//     };
//
//     return (
//         <div className={cx('wrapper')}>
//             <MDBContainer fluid className={cx('signin-form')}>
//                 fs
//             </MDBContainer>
//         </div>
//     );
// }
//
// export default SignIn;