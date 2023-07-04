import React, {useState} from 'react';
import {MDBContainer} from 'mdb-react-ui-kit';
import classNames from 'classnames/bind';
import {BsSearch} from 'react-icons/bs'; // Import the Bootstrap Icons search icon
import styles from './SearchInput.module.scss';
import {MdClear} from "react-icons/md";

const cx = classNames.bind(styles);

const SearchInput = ({searchTerm, setSearchTerm, handleSearch}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchIconClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleClearClick = () => {
        setSearchTerm('');
    }

    return (
        <MDBContainer className={cx('search-container')}>
            <div className={cx('search-wrapper')}>
                <BsSearch
                    className={cx('search-icon', 'me-3', {'search-icon-active': isSearchOpen})}
                    onClick={handleSearchIconClick}
                />
                {isSearchOpen && (
                    <>
                        <input
                            type="text"
                            className={cx('search-input')}
                            placeholder="Search here..."
                            value={searchTerm}
                            onChange={handleSearch}
                            autoFocus={isSearchOpen === true}
                        />
                        {searchTerm && (
                            <MdClear className={cx('clear-icon')} onClick={handleClearClick}/>
                        )}
                    </>
                )}
            </div>
        </MDBContainer>
    );
};

export default SearchInput;


// import React from 'react';
// import { MDBContainer } from 'mdb-react-ui-kit';
// import classNames from 'classnames/bind';
// import styles from './SearchInput.module.scss';
//
// const cx = classNames.bind(styles);
//
// const SearchInput = ({ searchTerm, handleSearch }) => {
//     return (
//         <MDBContainer className={cx('search-container')}>
//             <h2 className={cx('search-title')}>Search:</h2>
//             <input
//                 type="text"
//                 className={cx('search-input', 'ms-3')}
//                 placeholder="Search here..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//             />
//         </MDBContainer>
//     );
// };
//
// export default SearchInput;