import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import api from "~/api/api";


const FilterMovieGenre = ({cx, setGenreMovies, setShowGenreMovies}) => {
    const [genresMovies, setGenresMovies] = useState([])

    // const genreMovies = [
    //     {name: "action",},
    //     {name: "drama",},
    //     {name: "romance",},
    //     {name: "crime",},
    // ]

    useEffect(() => {
        api.get('/movies/genres')
            .then((response) => {
                setGenresMovies(response.data)
            })
            .catch((error) => {
                console.error(error);
            })
    })

    const handleMovieGenre = (e) => {
        e.preventDefault();
        setShowGenreMovies(true);

        const genre = e.target.value; // Lấy giá trị của thẻ Button được click
        api.get(`/movie/genre/${genre}`)
            .then(response => {
                setGenreMovies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleAllMovies = (e) => {
        e.preventDefault();

        api.get('/movies')
            .then(response => {
                setGenreMovies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className={cx('filter-movie-body')}>
            <div>
                <Button onClick={handleAllMovies}>
                    All Movies
                </Button>
            </div>
            <div className={cx('m-3', 'filter-movie-genre')}>
                {
                    genresMovies.map((genreMovie) => (
                        <Button
                            onClick={handleMovieGenre}
                            key={genreMovie.name}
                            className={'m-3'}
                            value={genreMovie.name}
                        >
                            {genreMovie.name}
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterMovieGenre;