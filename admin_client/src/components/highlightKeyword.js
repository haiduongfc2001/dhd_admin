import React from "react";

const highlightKeyword = (text, searchTerm) => {
    if (!searchTerm) {
        return text; // Không có từ khóa tìm kiếm, trả về text gốc
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const highlightedText = text.toString().replace(regex, (match) => {
        return `<span style="background-color: yellowgreen; font-weight: bold">${match}</span>`;
    });
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};

export default highlightKeyword;
