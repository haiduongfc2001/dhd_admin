import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "./Sidebar";
import Header from "~/components/Layout/components/Header";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const location = useLocation();
  useEffect(() => {
    // Thực hiện cuộn trang đến đầu trang khi chuyển trang
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>

    // <Container className={cx('wrapper')} style={{padding: 0, margin: 0, width: '100vw', height: '100vh'}}>
    //     <Row>
    //         <Col sm={12}>
    //             <Header />
    //         </Col>
    //     </Row>
    //     <Row className={cx('container')}>
    //         <Col sm={3}>
    //             <Sidebar/>
    //         </Col>
    //         <Col className={cx('content')} sm={12}>
    //             {children}
    //         </Col>
    //     </Row>
    // </Container>
  );
}

export default DefaultLayout;
