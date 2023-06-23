import {ArcElement, Chart as ChartJs, Legend, Title, Tooltip} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import api from "~/api/api";

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);

const PieChartUsers = () => {
    const [users, setUsers] = useState([]);
    const [adminCount, setAdminCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [notVerifiedCount, setNotVerifiedCount] = useState(0);

    useEffect(() => {
        api.get('/users/count-status')
            .then((response) => {
                setAdminCount(response.data.adminCount);
                setUsersCount(response.data.usersCount);
                setNotVerifiedCount(response.data.notVerifiedCount);
                console.log(response.data.adminCount);
            })
            .catch((error) => {
                console.log(error);
            })
    });

    const dataUsers = {
        labels: ['Admin', 'User', 'Not Verified'],
        datasets: [
            {
                data: [`${adminCount}`, `${usersCount}`, `${notVerifiedCount}`],
                backgroundColor: ['#198754', '#0dcaf0', '#dc3545'],
                hoverBackgroundColor: ['#198754', '#0dcaf0', '#dc3545'],
            },
        ],
    };

    // Cấu hình biểu đồ
    const options = {
        responsive: true,
    };


    return <Pie data={dataUsers} options={options}/>;
};

export default PieChartUsers;

// import React, { useEffect, useRef } from 'react';
// import { ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
// ChartJs.register(
//     Tooltip, Title, ArcElement, Legend
// )
//
// const PieChart = () => {
//     const data = {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
//         datasets: [
//             {
//                 data: [12, 19, 3, 5, 2],
//                 backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
//                 hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
//             },
//         ],
//     };
//
//     return <Pie data={data} />;
// };
//
// export default PieChart;

// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
//
// const PieChart = () => {
//     // Dữ liệu cho biểu đồ
//     const data = {
//         labels: ['No', 'Yes'],
//         datasets: [
//             {
//                 data: [55, 45],
//                 backgroundColor: ['#FF6384', '#36A2EB'],
//                 hoverBackgroundColor: ['#FF6384', '#36A2EB'],
//             },
//         ],
//     };
//
//     // Cấu hình biểu đồ
//     const options = {
//         responsive: true,
//     };
//
//     return (
//         <div>
//             <h2>Pie PieChart</h2>
//             <Doughnut data={data} options={options} />
//         </div>
//     );
// };
//
// export default PieChart;
