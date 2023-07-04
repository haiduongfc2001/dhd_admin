import React, {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";

import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";
import api from "~/api/api";

const cx = classNames.bind(styles)

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const [user_id, setUser_id] = useState('');

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');
        api.get(`/forget-password?token=${token}`)
            .then(response => {
                setUser_id(response.data.user_id);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setErrorMessage("Xin hãy nhập đầy đủ thông tin!");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Mật khẩu không khớp");
            return;
        }

        try {

            const response = await api.post('/admin/forgot-password', {
                password: password,
                user_id: user_id,
            });
            setNotificationMessage(response.data.message);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Lỗi server");
            }
        }
    }

    return (
        <div className={cx('wrapper')}>
            <MDBContainer fluid className={cx('signin-form')}>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-light text-black my-5 mx-auto'
                                 style={{borderRadius: '1rem', maxWidth: '400px'}}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                                <p className="text-black-150 mt-3 mb-4">
                                    Đặt lại mật khẩu
                                </p>

                                {/*<h1>User ID: {user_id}</h1>*/}

                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label={
                                        <>
                                            Nhập mật khẩu mới{" "}
                                            <span
                                                style={{color: "red"}}
                                                dangerouslySetInnerHTML={{__html: "*"}}
                                            />
                                        </>}
                                    type='password'
                                    size='lg'
                                    style={{maxWidth: '250px'}}
                                    autoFocus
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label={
                                        <>
                                            Xác nhận mật khẩu mới{" "}
                                            <span
                                                style={{color: "red"}}
                                                dangerouslySetInnerHTML={{__html: "*"}}
                                            />
                                        </>}
                                    type='password'
                                    size='lg'
                                    style={{maxWidth: '250px'}}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                {errorMessage && (
                                    <p className={"text-danger"}>{errorMessage}</p>
                                )}
                                {notificationMessage && (
                                    <p className={"text-success fw-bold"}>{notificationMessage}</p>
                                )}

                                <MDBBtn
                                    className='mx-2 px-5 text-black'
                                    color='red'
                                    size='lg'
                                    style={{backgroundColor: '#a69c9c', fontWeight: '600'}}
                                    onClick={handleResetPassword}
                                >
                                    Xác nhận
                                </MDBBtn>

                                <p className='small mt-3 mb-3 pb-lg-2'>
                                    <NavLink
                                        className='text-black-100'
                                        to='/admin/login'
                                    >
                                        Đăng nhập
                                    </NavLink>
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <ToastContainer/>
        </div>
    );
}

export default ResetPassword;