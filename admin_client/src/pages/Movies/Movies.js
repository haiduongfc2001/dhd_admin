import React, {useEffect, useRef, useState} from "react";
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

const cx = classNames.bind(styles)

function ListMovies() {
    const [movies, setMovies] = useState([]);

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
            .post("/movie/add-link", { link })
            .then((response) => {
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

    return (
        <>
            <BreadcrumbExample/>
            <AddMovie
                cx={cx}
            />

            <div>
                {/*<span className={'bold mb-3'}>Enter link to add</span>*/}

                <Form onSubmit={handleSubmit} style={{display: 'flex'}}>
                    <Form.Group controlId="linkInput" className="mb-3">
                        {/*<Form.Label>Enter Link</Form.Label>*/}
                        <Form.Control
                            type="text"
                            name="json"
                            placeholder="Enter link"
                            style={{minWidth: '300px', height: '40px'}}
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        style={{height: '40px'}}
                        className={'ms-3'}
                    >
                        Add
                    </Button>
                </Form>
            </div>


            <Table striped bordered hover>
                <thead>
                <tr style={{backgroundColor: 'antiquewhite'}} className={cx('table-movie-category')}>
                    <th>Movie ID</th>
                    <th>Movie Name</th>
                    <th>Overview</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {movies
                    .sort((a, b) => a.id - b.id)
                    .map((movie) => (
                        <tr key={movie._id}>
                            <td style={{textAlign: "center"}}>{movie.id}</td>
                            <td>
                                {/*{movie.title}*/}
                                <div className='d-flex align-items-center'>
                                    <img
                                        src={
                                            movie.poster_path.startsWith("/")
                                                ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                                                : movie.poster_path
                                        }
                                        alt="{user.title}"
                                        style={{width: '45px', height: '45px'}}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p
                                            className='fw-bold mb-1 limitLineClassName'
                                        >
                                            {movie.title}
                                        </p>
                                        {/*<p className='text-muted mb-0'>{movie.genres[0].name}</p>*/}
                                        <p className='text-muted mb-0'>
                                            {movie.genres.map((genre, index) => (
                                                genre.name
                                            )).join(', ')
                                            }
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className='ms-3'>
                                    <p
                                        className='fw-bold mb-1'
                                    >
                                        {movie.overview}
                                    </p>
                                </div>
                            </td>
                            <td>
                                {actionArray.map((action, index) => (
                                    <React.Fragment key={index}>
                                        {action.component(movie)}
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

export default ListMovies;



