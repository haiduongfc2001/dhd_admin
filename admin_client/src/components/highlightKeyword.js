// import React from 'react';
//
// const renderMovieTitle = (title, searchTerm) => {
//     if (!searchTerm) {
//         return title; // Không có từ khóa tìm kiếm, trả về title gốc
//     }
//
//     const regex = new RegExp(searchTerm, "gi");
//     const highlightedTitle = title.replace(regex, (match) => {
//         return `<span style="color: red; font-weight: bold">${match}</span>`;
//     });
//
//     return <span dangerouslySetInnerHTML={{ __html: highlightedTitle }} />;
// };
//
// export default renderMovieTitle;

import React from "react";

const highlightKeyword = (text, searchTerm) => {
    if (!searchTerm) {
        return text; // Không có từ khóa tìm kiếm, trả về text gốc
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const highlightedText = text.toString().replace(regex, (match) => {
        return `<span style="color: red; font-weight: bold">${match}</span>`;
    });
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};

export default highlightKeyword;

