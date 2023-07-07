import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";
import classNames from "classnames/bind";
import styles from "./Ratings.module.scss";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import api from "~/api/api";
import React, { useEffect, useState } from "react";
import formatReleaseDate from "~/components/formatReleaseDate";
import CircularProgressBarVote from "~/components/CircularProgressBar";
import DetailsMovie from "~/pages/Movies/DetailsMovie";

const cx = classNames.bind(styles);

const Ratings = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api
      .get("/movies/ratings")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setMovies]);

  const tableArray = [
    "ID Phim",
    "Tên phim",
    "Số lượt Vote",
    "Điểm trung bình",
    "Thông tin Ratings",
  ];

  return (
    <div className={cx("ratings-wrapper")}>
      <BreadcrumbExample />

      <div>Ratings</div>

      <div>
        <MDBTable align="middle">
          <MDBTableHead style={{ backgroundColor: "antiquewhite" }}>
            <tr className={cx("table-product-category")}>
              {tableArray.map((table, index) => (
                <th key={index} scope="col">
                  {table}
                </th>
              ))}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        movie.poster_path.startsWith("/")
                          ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                          : movie.poster_path
                      }
                      alt={movie.title}
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <DetailsMovie cx={cx} movie={movie} />
                      <p className="text-muted mb-0">
                        {formatReleaseDate(movie.release_date)}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={cx("vote-count")}>
                    <span>{movie.vote_count_user}</span>
                  </div>
                </td>
                <td>
                  <div className={cx("movie-rating")}>
                    <div
                      style={{ width: "45px", height: "45px" }}
                      className={"me-3"}
                    >
                      {movie.vote_count_user !== 0 ? (
                        <CircularProgressBarVote
                          value={movie.vote_average_user * 10}
                          text={`${movie.vote_average_user * 10}%`}
                        />
                      ) : (
                        <CircularProgressBarVote value={0} text={0} />
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  {movie.ratings &&
                    movie.ratings
                      .sort(
                        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                      )
                      .slice(0, 5)
                      .map((r) => (
                        <div key={r._id} className={cx("user-ratings", "m-2")}>
                          <div className={cx("me-2", "user-rating")}>
                            <span>{r.rating}</span>
                          </div>
                          <div className={cx("ms-2", "user-email")}>
                            <span>{r.user && r.user.email}</span>
                          </div>
                        </div>
                      ))}
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
};

export default Ratings;
