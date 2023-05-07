import {useEffect, useState, useRef} from "react";
import {Table, Button, Form} from 'react-bootstrap';
import React from 'react';
import Delete from "~/components/Layout/components/Modal/Delete";


function Test() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>

            <Delete
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default Test;
