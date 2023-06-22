import styles from './Home.module.scss'
import classNames from "classnames/bind"
import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";
import ListMovies from "~/pages/Movies/Movies";
import {Card} from "react-bootstrap";
import {BiMoviePlay} from "react-icons/bi";
import {FaUserAlt} from "react-icons/fa";
import {BsFillCartCheckFill} from "react-icons/bs";
import {AiFillStar} from "react-icons/ai";
import {useEffect, useState} from "react";
import api from "~/api/api";

const cx = classNames.bind(styles)

function Home() {
    const [countMovies, setCountMovies] = useState(0);
    const [countUsers, setCountUsers] = useState(0);
    const [countCompanies, setCountCompanies] = useState(0);
    const [countRatings, setCountRatings] = useState('');

    const getCountFromAPI = async (getAPI, setData) => {
        try {
            const response = await api.get(getAPI);
            setData(response.data.length);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCountFromAPI('/movies', setCountMovies);
    }, []);

    useEffect(() => {
        getCountFromAPI('/users', setCountUsers);
    }, []);

    useEffect(() => {
        getCountFromAPI('/movies/companies', setCountCompanies);
    }, []);

    useEffect(() => {
        getCountFromAPI('/movies/user-vote', setCountRatings);
    }, []);

    useEffect(() => {
        api.get('/movies/user-vote')
            .then(response => {
                const { countVote } = response.data;
                setCountRatings(countVote);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    const cardsData = [
        {
            card: 'card-movies',
            cardIcon: 'card-movies-icon',
            icon: <BiMoviePlay/>,
            cardText: 'card-movies-text',
            count: countMovies,
        },
        {
            card: 'card-users',
            cardIcon: 'card-users-icon',
            icon: <FaUserAlt/>,
            cardText: 'card-users-text',
            count: countUsers,
            text: 'Movies'
        },
        {
            card: 'card-companies',
            cardIcon: 'card-companies-icon',
            icon: <BsFillCartCheckFill/>,
            cardText: 'card-companies-text',
            count: countCompanies,
            text: 'Companies'
        },
        {
            card: 'card-ratings',
            cardIcon: 'card-ratings-icon',
            icon: <AiFillStar/>,
            cardText: 'card-ratings-text',
            count: countRatings,
            text: 'Ratings'
        },
    ]

    return (
        <div className={cx('wrapper')}>
            <BreadcrumbExample/>

            <div className={cx('card-dashboard')}>
                {
                    cardsData.map((c, index) => (
                        <Card className={cx(`${c.card}`)} key={index}>
                            <div className={cx(`${c.cardIcon}`, 'm-3')}>{c.icon}</div>
                            <div className={cx('m-3', `${c.cardText}`)}>
                                <h2>{c.count} {c.text}</h2>
                            </div>
                        </Card>
                    ))
                }

                {/*<Card className={cx('card-movies')}>*/}
                {/*    <div className={cx('card-movies-icon', 'm-3')}><BiMoviePlay/></div>*/}
                {/*    <div className={cx('m-3', 'card-movies-text')}>*/}
                {/*        <h2>{countMovies} Movies</h2>*/}
                {/*    </div>*/}
                {/*</Card>*/}

            </div>
        </div>
    )
}

export default Home;