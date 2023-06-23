const getFormattedDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
};

export default getFormattedDate;