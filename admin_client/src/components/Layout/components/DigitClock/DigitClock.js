import classNames from "classnames/bind";
import styles from './DigitClock.module.scss'
import {useEffect, useState} from "react";

const cx = classNames.bind(styles)

function DigitClock () {
    const [time, setTime] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let day_night = "AM";

            if (hours > 12) {
                hours = hours - 12;
                day_night = "PM";
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            setTime(hours + ":" + minutes + ":" + seconds + " " + day_night);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className={"me-5"}>
            <div className={cx("wrapper-clock")}>
                <div className={cx("display")}>
                    <div className={cx('time')}>{time}</div>
                </div>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default DigitClock;