import React, {useState} from 'react';
import axios from 'axios';
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

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import {useHistory} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import api from "~/api/api";

const history = createBrowserHistory();

const cx = classNames.bind(styles)

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/admin/login', {
                email,
                password,
            });

            const token = response.data.token;

            // Save the token to local storage
            localStorage.setItem('token', token);

            // Redirect to '/'
            window.location.href = 'http://localhost:3000/';

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

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