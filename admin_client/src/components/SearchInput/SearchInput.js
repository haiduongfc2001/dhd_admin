import React from 'react';
import {MDBContainer} from "mdb-react-ui-kit";

import classNames from "classnames/bind"
import styles from "./SearchInput.module.scss"
const cx = classNames.bind(styles)

const SearchInput = ({ searchTerm, handleSearch }) => {
    return (
        <MDBContainer className="d-flex align-items-center">
            <h2>Search:</h2>
            <input
                type="text"
                className={cx('search-hover', 'ms-3')}
                placeholder="search here..."
                value={searchTerm}
                onChange={handleSearch}
            />
        </MDBContainer>
    )
}

export default SearchInput;