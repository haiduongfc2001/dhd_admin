import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";

import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";
import api from "~/api/api";

const cx = classNames.bind(styles)

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrorMessage("Xin hãy nhập email");
            return; // Dừng lại nếu không nhập email
        }

        try {

            const response = await api.post('/admin/forget', {email});
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
                                    Nhập email của bạn để lấy lại mật khẩu!
                                </p>

                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label={
                                        <>
                                            Email address{" "}
                                            <span
                                                style={{color: "red"}}
                                                dangerouslySetInnerHTML={{__html: "*"}}
                                            />
                                        </>}
                                    type='email'
                                    size='lg'
                                    style={{maxWidth: '250px'}}
                                    autoFocus
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                {errorMessage && (
                                    <p className={"text-danger"}>{errorMessage}</p>
                                )}
                                {notificationMessage && (
                                    <p className={"text-success"}>{notificationMessage}</p>
                                )}

                                <MDBBtn
                                    className='mx-2 px-5 text-black'
                                    color='red'
                                    size='lg'
                                    style={{backgroundColor: '#a69c9c', fontWeight: '600'}}
                                    onClick={handleSubmit}
                                >
                                    Gửi mail
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

export default ForgotPassword;