import { Button } from "react-bootstrap";
import React from "react";
import api from "~/api/api";
import {
  AiOutlineDown,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";

const SortMoviesByRatings = ({
  cx,
  setRatingsMovies,
  setShowRatingsMovies,
}) => {
  const handleDecRatingsMovies = (e) => {
    e.preventDefault();
    setShowRatingsMovies(true);

    api
      .get("/movies/decRatings")
      .then((response) => {
        setRatingsMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAscRatingsMovies = (e) => {
    e.preventDefault();
    setShowRatingsMovies(true);

    api
      .get("/movies/ascRatings")
      .then((response) => {
        setRatingsMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={cx("m-3", "mt-4", "sort-movie-rating")}>
      <p>
        Ratings
        <span>
          {" "}
          <AiOutlineDown />{" "}
        </span>
      </p>
      <ul>
        <li className={"mb-2"}>
          <Button onClick={handleAscRatingsMovies}>
            A - Z
            <AiOutlineArrowUp className={"ms-2"} />
          </Button>
        </li>
        <li className={"mb-2"}>
          <Button onClick={handleDecRatingsMovies}>
            Z - A
            <AiOutlineArrowDown className={"ms-2"} />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SortMoviesByRatings;
