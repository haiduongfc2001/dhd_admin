import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import usePasswordToggle from "~/hooks/usePasswordToggle";
import classNames from "classnames/bind";
import styles from "./SignIn.module.scss";
import logoDHD from "~/assets/images/logo_dhdadmin.png";

// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';

import {useLocation, useNavigate} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import api from "~/api/api";
import { AuthContext } from '~/context/AuthContext';
import {toast} from "react-toastify";

const history = createBrowserHistory();

const cx = classNames.bind(styles)


function SignIn() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const errRef = useRef();

    const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle();

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    useEffect(() => {
        setErrMsg('');
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            navigate('/');
        }
    }, [setIsLoggedIn, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/admin/login', {
                    email,
                    password
                }
            );
            // console.log(JSON.stringify(response?.data));

            const token = response.data.token;

            // Save the token to local storage
            localStorage.setItem('token', token);

            setIsLoggedIn(true);
            // setEmail('');
            // setPassword('');
            // setSuccess(true);
            // Redirect to the desired page after successful login
            // You can replace the URL below with the appropriate route
            // window.location.href = 'http://localhost:3000/';
            navigate('/');
            toast.success('Logged in successfully!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Email or Password incorrect!');
            } else if (err.response?.status === 401) {
                setErrMsg('Email or Password incorrect!');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
            toast.error('Login failed!');
        }
    };

    // useEffect(() => {
    //     api.get('/admin/dashboard')
    //         .then(response => {
    //
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // })

    // return (
    //     <div>
    //         <h2>Login</h2>
    //         <form onSubmit={handleLogin}>
    //             <div>
    //                 <label>Email:</label>
    //                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //             </div>
    //             <div>
    //                 <label>Password:</label>
    //                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //             </div>
    //             <button type="submit">Login</button>
    //         </form>
    //     </div>
    // );

    return (
        <div className={cx('wrapper')}>
            <MDBContainer fluid className={cx('signin-form')}>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-light text-black my-5 mx-auto'
                                 style={{borderRadius: '1rem', maxWidth: '400px'}}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                                {/*<h2 className="fw-bold mb-2 text-uppercase">Login</h2>*/}
                                <img
                                    src={logoDHD}
                                    alt="logo dhd"
                                    className={cx('logo-admin')}
                                />
                                <p className="text-black-150 mt-3 mb-3">
                                    Please login with your admin account!
                                </p>

                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label='Email address'
                                    // id='formControlLg'
                                    type='email'
                                    size='lg'
                                    style={{maxWidth: '250px'}}
                                    autoFocus
                                    autoComplete='off'
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label='Password'
                                    // id='formControlLg'
                                    type={PasswordInputType}
                                    size='lg'
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                    {password && (
                                        <span
                                            className={cx('password-toogle-icon')}
                                            onClick={toggleVisibility}
                                        >
                                            {ToggleIcon}
                                        </span>
                                    )}
                                </MDBInput>

                                <p ref={errRef} className={errMsg ? "errmsg text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>

                                {error && <p className='text-danger'>{error}</p>}

                                <p className='small mb-3 pb-lg-2'>
                                    <a className='text-black-50' href='/admin/login'>
                                        Forgot password?
                                    </a>
                                </p>

                                <MDBBtn
                                    className='mx-2 px-5 text-black'
                                    color='red'
                                    size='lg'
                                    style={{backgroundColor: '#a69c9c', fontWeight: '600'}}
                                    onClick={handleLogin}
                                >
                                    Login
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default SignIn;