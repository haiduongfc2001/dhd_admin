import {useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

function Header() {

    const handleLogout = async () => {
        //
    }

    return (
        <Button
            onClick={handleLogout}
        >
            Logout
        </Button>
    )
}

export default Header;