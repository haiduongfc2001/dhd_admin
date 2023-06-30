import {Button, FloatingLabel, Form, Modal, ModalTitle} from "react-bootstrap";
import React, {useState} from "react";
import highlightKeyword from "~/components/highlightKeyword";
import {MDBBadge} from "mdb-react-ui-kit";
import formatReleaseDate from "~/components/formatReleaseDate";


const DetailsMovie = ({cx, movie, searchTerm}) => {
    const [show, setShow] = useState(false);
    // const [id, setId] = useState("");
    // const [title, setTitle] = useState("");
    // const [overview, setOverview] = useState('');
    // const [poster_path, setPoster_Path] = useState('');
    // const [genres, setGenres] = useState([]);
    // const [production_companies, setProduction_companies] = useState([]);
    // const [production_countries, setProduction_countries] = useState([]);

    const handleShow = () => {
        setShow(true);
        // setId(movie.id);
        // setTitle(movie.title);
        // setOverview(movie.overview);
        // setPoster_Path(movie.poster_path);
        // setGenres(movie.genres);
        // setProduction_companies(movie.production_companies);
        // setProduction_countries(movie.production_countries);
    }

    const handleClose = () => {
        setShow(false);
    }

    const infoMovie = [
        {
            label: "ID",
            type: "text",
            id: "id",
            value: movie.id,
        },
        {
            label: "Tên phim",
            type: "text",
            id: "title",
            value: movie.title,
        },
        {
            label: "Mô tả",
            type: "textarea",
            id: "overview",
            value: movie.overview,
        },
        {
            label: "Thể loại",
            type: "text",
            id: "genres",
            value: movie.genres && movie.genres.map((genre) => genre.name).join(", "),
        },
        {
            label: "Ngày phát hành",
            type: "text",
            id: "release_date",
            value: formatReleaseDate(movie.release_date),
        },
        {
            label: "Poster",
            type: "text",
            id: "poster_path",
            value: movie.poster_path,
        },
        {
            label: "Nhà sản xuất",
            type: "textarea",
            id: "production_companies",
            value: movie.production_companies && movie.production_companies.map((company) => company.name).join(", "),
        },
        {
            label: "Nước sản xuất",
            type: "textarea",
            id: "production_countries",
            value: movie.production_countries && movie.production_countries.map((country) => country.name).join(", "),
        },
        {
            label: "Số lượt đánh giá",
            type: "text",
            id: "vote_count_user",
            value: movie.vote_count_user,
        },
        {
            label: "Điểm trung bình",
            type: "text",
            id: "vote_average_user",
            value: movie.vote_average_user,
        },
    ]

    return (
        <>
            <p
                className={cx('fw-bold', 'mb-1', 'limitLineClassName', 'movie-info')}
                onClick={handleShow}
            >
                {highlightKeyword(movie.title, searchTerm)}
            </p>

            <Modal show={show} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Thông tin phim chi tiết</ModalTitle>
                </Modal.Header>
                <Modal.Body className={cx('modal-body')}>
                    <Form inline='true' className={cx('form-movie')}>
                        {movie.poster_path ? (
                            <img
                                src={
                                    movie.poster_path.startsWith("/")
                                        ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                                        : movie.poster_path
                                }
                                alt={movie.title}
                                style={{
                                    marginBottom: '10px',
                                    width: "150px",
                                    height: "225px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                        ) : (
                            <span>Không có ảnh</span>
                        )
                        }
                        {infoMovie.map((form, index) => (
                            <FloatingLabel
                                key={index}
                                label={form.label}
                                className="mr-sm-2 mb-3"
                            >
                                <Form.Control
                                    autoFocus={form.id === 'title'}
                                    as={form.type === 'textarea' ? 'textarea' : undefined}
                                    id={form.id}
                                    value={form.value}
                                    size="lg"
                                    style={{
                                        minHeight: form.type === 'textarea' ? "100px" : "40px",
                                        borderRadius: 'var(--default-border-radius)'
                                    }}
                                    readOnly={true}
                                    required
                                />
                            </FloatingLabel>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailsMovie;