import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '~/api/api'
import {Form, Table, Button} from 'react-bootstrap';

import AddMovie from "./AddMovie"
import DeleteMovie from "./DeleteMovie";
import EditMovie from "./EditMovie";

import BreadcrumbExample from "~/components/Layout/components/BreadcrumbExample/BreadcrumbExample";

import classNames from "classnames/bind"
import styles from "./Movie.module.scss"
import formatReleaseDate from "~/components/formatReleaseDate";
import {MDBBadge} from "mdb-react-ui-kit";
import highlightKeyword from "~/components/highlightKeyword";
import CircularProgressBarVote from "~/components/CircularProgressBar";
import SearchInput from "~/components/SearchInput/SearchInput";
import {AiFillFilter} from "react-icons/ai";
import FilterMovieGenre from "~/pages/Movies/FilterMovieGenre";
import DetailsMovie from "~/pages/Movies/DetailsMovie";

const cx = classNames.bind(styles)

function ListMovies() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [genreMovies, setGenreMovies] = useState([]);
    const [showGenreMovies, setShowGenreMovies] = useState(false);

    const [link, setLink] = useState('');

    useEffect(() => {
        api.get('/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        api
            .post("/movie/add-link", {link})
            .then(() => {
                setLink("");
                toast.success('Movie added successfully!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch((error) => {
                toast.error('Error adding movie!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.error(error);
            });
    };

    const actionArray = [
        {
            type: 'component',
            component: (movie) => (
                <EditMovie
                    cx={cx}
                    movie={movie}
                />
            ),
        },
        {
            type: 'component',
            component: (movie) => (
                <DeleteMovie
                    cx={cx}
                    styles={styles}
                    movie={movie}
                    movies={movies}
                    setMovies={setMovies}
                />
            ),
        },
    ]

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredMovies = movies.filter((movie) => {
        const idMatch = movie.id.toString().includes(searchTerm);
        const titleMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const overviewMatch = movie.overview.toLowerCase().includes(searchTerm.toLowerCase());
        return idMatch || titleMatch || overviewMatch;
    });

    return (
        <>
            <BreadcrumbExample/>
            <AddMovie
                cx={cx}
            />

            <div
                className={'mt-3 mb-3 d-flex align-items-center justify-content-between'}
                style={{fontSize: 'var(--default-font-size'}}
            >
                <SearchInput
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                />

                <div className={'d-flex align-items-center'}>
                    {/*<span className={'bold mb-3'}>Enter link to add</span>*/}

                    <Form onSubmit={handleSubmit} style={{display: 'flex'}}>
                        <Form.Group controlId="linkInput">
                            {/*<Form.Label>Enter Link</Form.Label>*/}
                            <Form.Control
                                type="text"
                                name="json"
                                placeholder="Enter movie id to add"
                                style={{
                                    minWidth: '180px',
                                    height: '40px',
                                    fontSize: 'var(--default-font-size)',
                                    borderRadius: '10px'
                                }}
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            style={{height: '40px', fontSize: 'var(--default-font-size)'}}
                            className={'ms-3'}
                        >
                            Add
                        </Button>
                    </Form>
                </div>
            </div>

            <div className={'d-flex'}>
                <Table striped bordered hover>
                    <thead>
                    <tr className={cx('table-movie-category')}>
                        <th>ID</th>
                        <th>Movie Title</th>
                        <th>Release Date</th>
                        <th>Production Country</th>
                        <th>Overview</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>

                    </thead>
                    <tbody>
                    {((showGenreMovies && genreMovies.length !== 0) ? genreMovies : filteredMovies)
                        .sort((a, b) => a.id - b.id)
                        .map((movie) => (
                            movie ? (
                                <tr key={movie._id}>
                                    <td style={{ textAlign: "center" }}>
                                        {highlightKeyword(movie.id, searchTerm)}
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={movie.poster_path.startsWith("/") ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` : movie.poster_path}
                                                alt="{user.title}"
                                                style={{ width: "45px", height: "45px" }}
                                                className="rounded-circle"
                                            />
                                            <div className="ms-3">
                                                <DetailsMovie
                                                    cx={cx}
                                                    movie={movie}
                                                    searchTerm={searchTerm}
                                                />
                                                <p className="mb-0">
                                                    {/*{movie.genres && movie.genres.map((genre) => genre.name).join(", ")}*/}

                                                    {movie.genres && movie.genres.map((genre, index) => (
                                                        <MDBBadge
                                                            key={index}
                                                            pill
                                                            className={cx('badge-genre-movie', 'm-1')}
                                                        >
                                                            {genre.name}
                                                        </MDBBadge>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        {formatReleaseDate(movie.release_date)}
                                    </td>
                                    <td>
                                        {movie.production_countries && movie.production_countries.map((country, index) => (
                                            <MDBBadge
                                                key={index}
                                                pill
                                                className={cx('badge-production-country', 'm-1')}
                                            >
                                                {country.name}
                                            </MDBBadge>
                                        ))}
                                    </td>
                                    <td>
                                        <div className="ms-3">
                                            <p
                                                className="fw-bold mb-1"
                                                style={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "3",
                                                    WebkitBoxOrient: "vertical",
                                                }}
                                            >
                                                {highlightKeyword(movie.overview, searchTerm)}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {movie.vote_count_user !== 0 ? (
                                            <div className={cx('movie-rating')}>
                                                <div
                                                    style={{ width: "45px", height: '45px' }}
                                                    className={'me-3'}
                                                >
                                                    <CircularProgressBarVote
                                                        value={(movie.vote_average_user * 10)}
                                                        text={`${(movie.vote_average_user * 10)}%`}
                                                    />
                                                </div>
                                                <p className="text-muted mb-0">
                                                    {movie.vote_count_user} ratings
                                                </p>
                                            </div>
                                        ) : (
                                            <div className='d-flex justify-content-center'>
                                                No ratings available
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {actionArray.map((action, index) => (
                                            <React.Fragment key={index}>
                                                {action.component(movie)}
                                            </React.Fragment>
                                        ))}
                                    </td>
                                </tr>
                            ) : (
                                <tr key="no-movies">
                                    <td colSpan="7">
                                        <h1 className="d-flex justify-content-center">
                                            Không có phim nào
                                        </h1>
                                    </td>
                                </tr>
                            ))
                        )}
                    {((showGenreMovies && genreMovies.length === 0) || (!showGenreMovies && filteredMovies.length === 0)) && (
                        <tr key="no-movies">
                            <td colSpan="7" className={cx("no-movies")}>
                                <h1>Không có phim nào được tìm thấy</h1>
                            </td>
                        </tr>
                    )}
                    </tbody>

                </Table>

                <div className={cx('ms-3', 'filter-movie')}>
                    <div className={cx('m-3', 'filter-movie-title')}>
                        <AiFillFilter/>
                        <h3 className={'ms-3 mb-0'}>Lọc phim</h3>
                    </div>
                    <FilterMovieGenre
                        cx={cx}
                        setGenreMovies={setGenreMovies}
                        setShowGenreMovies={setShowGenreMovies}
                    />
                </div>
            </div>

            <ToastContainer/>
        </>
    );
}

export default ListMovies;