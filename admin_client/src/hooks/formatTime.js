import moment from "moment";

function formatTime(time) {
    return moment(time).format('DD-MM-YYYY HH:mm:ss');
}

export default formatTime;