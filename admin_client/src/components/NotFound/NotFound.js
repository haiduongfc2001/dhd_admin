import {NavLink} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";
import {GrReturn} from "react-icons/gr";


function NotFound() {
    const token =  localStorage.getItem('token');

    return (
        <div className={'d-flex align-items-center justify-content-center flex-column vh-100'}>
            <h1 className={'mb-3'}>Trang này không tồn tại</h1>
            {
                // Nếu trong localStorage có token thì sẽ render <h1>abc</h1> còn không có sẽ render ra <h1>123</h1>
                token ? (
                    <NavLink to={'/'}>
                        <MDBBtn>
                            <GrReturn className={'me-3'} style={{fontSize: '20px'}} />
                            <span style={{fontSize: '16px'}} className={'bold'}>
                        Quay lại trang chủ
                    </span>
                        </MDBBtn>
                    </NavLink>
                ) : (
                    <NavLink to={'/admin/login'}>
                        <MDBBtn>
                            <GrReturn className={'me-3'} style={{fontSize: '20px'}} />
                            <span style={{fontSize: '16px'}} className={'bold'}>
                        Quay lại trang đăng nhập
                    </span>
                        </MDBBtn>
                    </NavLink>
                )
            }
        </div>
    )
}

export default NotFound;