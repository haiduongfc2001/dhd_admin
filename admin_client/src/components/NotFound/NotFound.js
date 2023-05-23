import {NavLink} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";
import {GrReturn} from "react-icons/gr";


function NotFound() {
    return (
        <div className={'d-flex align-items-center justify-content-center flex-column vh-100'}>
            <h1 className={'mb-3'}>Trang này không tồn tại</h1>
            <NavLink to={'/admin/login'}>
                <MDBBtn>
                    <GrReturn className={'me-3'} style={{fontSize: '20px'}} />
                    <span style={{fontSize: '16px'}} className={'bold'}>
                        Quay lại trang đăng nhập
                    </span>
                </MDBBtn>
            </NavLink>
        </div>
    )
}

export default NotFound;