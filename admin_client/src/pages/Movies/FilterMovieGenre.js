import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import api from "~/api/api";
import { BsCheckAll } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";

const FilterMovieGenre = ({ cx, setGenreMovies, setShowGenreMovies }) => {
  const [genresMovies, setGenresMovies] = useState([]);

  useEffect(() => {
    api
      .get("/movies/genres")
      .then((response) => {
        setGenresMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setGenresMovies]);

  const handleMovieGenre = (e) => {
    e.preventDefault();
    setShowGenreMovies(true);

    const genre = e.target.value; // Lấy giá trị của thẻ Button được click
    api
      .get(`/movie/genre/${genre}`)
      .then((response) => {
        setGenreMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAllMovies = (e) => {
    e.preventDefault();

    api
      .get("/movies")
      .then((response) => {
        setGenreMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cx("m-3", "filter-movie-genre")}>
      <p onClick={handleAllMovies}>
        Thể loại
        <span>
          {" "}
          <AiOutlineDown />{" "}
        </span>
      </p>
      <ul>
        <li className={"mb-2"}>
          <Button onClick={handleAllMovies} value={"All Movies"}>
            All Movies
            <BsCheckAll className={"ms-2"} />
          </Button>
        </li>
        {genresMovies
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((genreMovie) => (
            <li key={genreMovie.id} className={"mb-2"}>
              <Button onClick={handleMovieGenre} value={genreMovie.name}>
                {genreMovie.name}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FilterMovieGenre;
