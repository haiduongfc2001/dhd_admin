import axios from "axios";
function Header() {

    const handleLogout = () => {
        //
    }

    return (
        <header>
            <div onClick={handleLogout}>
                Logout
            </div>
        </header>
    )
}

export default Header;