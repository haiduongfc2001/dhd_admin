import React, { useEffect, useState } from 'react';
import { CategoryScale, Chart as ChartJs, PointElement, LinearScale, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from "~/api/api";
import formatDayMonth from "~/components/formatDayMonth";
import getFormattedDate from "~/components/formatDayMonth";
import {get} from "axios";

ChartJs.register(
    CategoryScale, PointElement, LinearScale, LineElement
);

const LineChart = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const labels = [];
    const currentDate = new Date();

    for (let i = 16; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        const dateRegister = getFormattedDate(date);
        labels.push(dateRegister);
    }

    const dataUser = {};
    for (const user of users) {
        const createdAt = new Date(user.createdAt);
        const dateRegister = getFormattedDate(createdAt );

        if (labels.includes(dateRegister)) {
            if (!dataUser[dateRegister]) {
                dataUser[dateRegister] = 0;
            }

            dataUser[dateRegister]++;
        }
    }

    const dataUserRegister = labels.map(label => dataUser[label] || 0)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Số người dùng đăng ký',
                data: dataUserRegister,
                fill: false,
                borderColor: '#0d6efd',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ngày',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Số người dùng',
                },
                ticks: {
                    min: 0,
                    stepSize: 1, // Đơn vị bước là 1
                    precision: 0, // Số thập phân sau dấu chấm thập phân là 0
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;


