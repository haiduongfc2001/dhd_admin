import React, {useEffect, useRef, useState} from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '~/api/api'
import {Table} from 'react-bootstrap';

import AddCompany from "./AddCompany"
import DeleteCompany from "./DeleteCompany";
import EditCompany from "./EditCompany";

import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";

import classNames from "classnames/bind"
import styles from "./Companies.module.scss"

const cx = classNames.bind(styles)

function Companies() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        api.get('/movies/companies')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    const actionArray = [
        {
            type: 'component',
            component: (company) => (
                <EditCompany
                    cx={cx}
                    company={company}
                />
            ),
        },
        {
            type: 'component',
            component: (company) => (
                <DeleteCompany
                    cx={cx}
                    company={company}
                    companies={companies}
                    setCompanies={setCompanies}
                />
            ),
        },
    ]

    return (
        <>
            <BreadcrumbExample/>
            <AddCompany
                cx={cx}
            />

            <Table striped bordered hover>
                <thead>
                <tr style={{backgroundColor: 'antiquewhite'}} className={cx('table-company-category')}>
                    <th style={{maxWidth: '215px', width: '215px'}}>Company ID</th>
                    <th>Company Logo</th>
                    <th>Company Name</th>
                    <th>Company Country</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {companies.length && companies.map((company, index) => (
                    <tr key={index}>
                        <td style={{textAlign: "center"}}>{company.id}</td>
                        <td  style={{textAlign: "center"}}>
                            {company.logo_path !== null
                                ? (
                                    <img
                                        src={
                                            company.logo_path.startsWith("/")
                                                ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${company.logo_path}`
                                                : company.logo_path
                                        }
                                        alt={company.name}
                                        style={{width: "65px", height: "65px", borderRadius: "10px"}}
                                        // className="rounded-circle"
                                    />
                                )
                                : (
                                    <span>Không có ảnh</span>
                                )
                            }
                        </td>
                        <td>{company.name}</td>
                        <td  style={{textAlign: "center"}}>
                            <b>{company.origin_country}</b>
                        </td>
                        <td>
                            {actionArray.map((action, index) => (
                                <React.Fragment key={index}>
                                    {action.component(company)}
                                </React.Fragment>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <ToastContainer/>
        </>
    );
}

export default Companies;

