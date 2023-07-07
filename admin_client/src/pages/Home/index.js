import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";
// import ListMovies from "~/pages/Movies/Movies";
import { Card } from "react-bootstrap";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import api from "~/api/api";
import { Link } from "react-router-dom";
import PieChartUsers from "~/components/PieChart/PieChartUsers";
import LineChart from "~/components/LineChart/LineChart";

const cx = classNames.bind(styles);

function Home() {
  const [countMovies, setCountMovies] = useState(0);
  const [countUsers, setCountUsers] = useState(0);
  const [countCompanies, setCountCompanies] = useState(0);
  const [countRatings, setCountRatings] = useState("");

  const getCountFromAPI = async (getAPI, setData) => {
    try {
      const response = await api.get(getAPI);
      setData(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountFromAPI("/movies", setCountMovies);
  }, []);

  useEffect(() => {
    getCountFromAPI("/users", setCountUsers);
  }, []);

  useEffect(() => {
    getCountFromAPI("/movies/companies", setCountCompanies);
  }, []);

  useEffect(() => {
    api
      .get("/movies/user-vote")
      .then((response) => {
        const { countVote } = response.data;
        setCountRatings(countVote);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const cardsData = [
    {
      card: "card-movies",
      cardIcon: "card-movies-icon",
      icon: <BiMoviePlay />,
      cardText: "card-movies-text",
      count: countMovies,
      text: "Movies",
      cardLink: "/movies",
    },
    {
      card: "card-users",
      cardIcon: "card-users-icon",
      icon: <FaUserAlt />,
      cardText: "card-users-text",
      count: countUsers,
      text: "Users",
      cardLink: "/users",
    },
    {
      card: "card-companies",
      cardIcon: "card-companies-icon",
      icon: <BsFillCartCheckFill />,
      cardText: "card-companies-text",
      count: countCompanies,
      text: "Companies",
      cardLink: "/companies",
    },
    {
      card: "card-ratings",
      cardIcon: "card-ratings-icon",
      icon: <AiFillStar />,
      cardText: "card-ratings-text",
      count: countRatings,
      text: "Ratings",
      cardLink: "/ratings",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <BreadcrumbExample />

      <div className={cx("card-dashboard")}>
        {cardsData.map((c, index) => (
          <Card className={cx(`${c.card}`)} key={index}>
            <div className={cx(`${c.cardIcon}`, "m-3")}>{c.icon}</div>
            <div className={cx("m-3", `${c.cardText}`)}>
              <Link to={`${c.cardLink}`}>
                <h2>
                  {c.count} {c.text}
                </h2>
              </Link>
            </div>
          </Card>
        ))}

        {/*<Card className={cx('card-movies')}>*/}
        {/*    <div className={cx('card-movies-icon', 'm-3')}><BiMoviePlay/></div>*/}
        {/*    <div className={cx('m-3', 'card-movies-text')}>*/}
        {/*        <h2>{countMovies} Movies</h2>*/}
        {/*    </div>*/}
        {/*</Card>*/}
      </div>

      <div className={cx("users-chart", "mt-5", "mb-5")}>
        <div className={cx("users-chart-column")}>
          <h1>Số người dùng đăng ký theo ngày</h1>
          <LineChart />
        </div>

        <div className={cx("users-chart-pie")}>
          <h1>Thống kê tài khoản</h1>
          <PieChartUsers />
        </div>
      </div>
    </div>
  );
}

export default Home;
