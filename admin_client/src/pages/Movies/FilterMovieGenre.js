import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import api from "~/api/api";
import {BsCheckAll} from "react-icons/bs";


const FilterMovieGenre = ({cx, setGenreMovies, setShowGenreMovies}) => {
    const [genresMovies, setGenresMovies] = useState([]);

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
            <div className={cx('m-3', 'filter-movie-genre')}>
                <p onClick={handleAllMovies}>
                    Thể loại
                    <span> > </span>
                </p>
                <ul>
                    <li className={'mb-2'}>
                        <Button
                            onClick={handleAllMovies}
                            value={'All Movies'}
                        >
                            All Movies
                            {/*<BsCheckAll className={'ms-1'}/>*/}
                        </Button>
                    </li>
                    {
                        genresMovies
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((genreMovie) => (
                            <li
                                key={genreMovie.id}
                                className={'mb-2'}
                            >
                                <Button
                                    onClick={handleMovieGenre}
                                    value={genreMovie.name}
                                >
                                    {genreMovie.name}
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>


        // <div className={cx('filter-movie-body')}>
        //     <p>
        //         <Button onClick={handleAllMovies}>
        //             All Movies
        //             <span> > </span>
        //         </Button>
        //     </p>
        //     <div className={cx('m-3', 'filter-movie-genre')}>
        //         {
        //             genresMovies.map((genreMovie) => (
        //                 <Button
        //                     onClick={handleMovieGenre}
        //                     key={genreMovie.name}
        //                     className={'m-3'}
        //                     value={genreMovie.name}
        //                 >
        //                     {genreMovie.name}
        //                 </Button>
        //             ))
        //         }
        //     </div>
        // </div>
    )
}

export default FilterMovieGenre;