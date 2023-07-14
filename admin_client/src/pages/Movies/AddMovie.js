import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Button, FloatingLabel, Form, ModalTitle } from "react-bootstrap";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import api from "~/api/api";

function AddMovie({ cx, setMovies }) {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_Path] = useState("");
  const [release_date, setRelease_Date] = useState("");

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setTitle("");
    setOverview("");
    setPoster_Path("");
    setRelease_Date("");
    setErrorMessage("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOverviewChange = (e) => {
    setOverview(e.target.value);
  };

  const handlePoster_PathChange = (e) => {
    setPoster_Path(e.target.value);
  };

  const handleRelease_DateChange = (e) => {
    setRelease_Date(e.target.value);
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();

    if (!title || !overview || !poster_path || !release_date) {
      toast.error("Xin vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const data = {
      title: title,
      overview: overview,
      poster_path: poster_path,
      release_date: release_date,
    };

    try {
      const response = await api.post("/movie", data);

      console.log(response.data);

      setShow(false);
      setTitle("");
      setOverview("");
      setPoster_Path("");
      setRelease_Date("");
      setErrorMessage("");

      // Gọi lại API để lấy danh sách movie và cập nhật state
      const getMoviesResponse = await api.get("/movies");
      setMovies(getMoviesResponse.data);

      toast.success("Movie added successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      // setErrorMessage('Failed to add movie');
      toast.error("Error adding movie!", {
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
    }
  };

  const addMovieForm = [
    {
      label: (
        <>
          Movie Name{" "}
          <span
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: "*" }}
          />
        </>
      ),
      type: "text",
      id: "title",
      value: title,
      onChange: handleTitleChange,
    },
    {
      label: (
        <>
          Movie Overview{" "}
          <span
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: "*" }}
          />
        </>
      ),
      type: "text",
      id: "overview",
      value: overview,
      onChange: handleOverviewChange,
    },
    {
      label: (
        <>
          Movie Poster Path{" "}
          <span
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: "*" }}
          />
        </>
      ),
      type: "text",
      id: "poster_path",
      value: poster_path,
      onChange: handlePoster_PathChange,
    },
    {
      label: (
        <>
          Movie Release Date{" "}
          <span
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: "*" }}
          />
        </>
      ),
      type: "date",
      id: "release_date",
      value: release_date,
      onChange: handleRelease_DateChange,
    },
  ];

  return (
    <>
      <Button
        size="lg"
        variant="primary"
        className={"mb-4"}
        onClick={handleShow}
      >
        <IoMdAddCircle className={cx("icon-action")} />
      </Button>

      <Modal show={show} backdrop={"static"} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <ModalTitle>
            <h2>Add Movie</h2>
          </ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Form className={cx("form-movie")}>
            {addMovieForm.map((form, index) => (
              <FloatingLabel
                key={index}
                label={form.label}
                className="mr-sm-2 mb-2 min-height-50"
              >
                <Form.Control
                  autoFocus={form.id === "title"}
                  id={form.id}
                  type={form.type}
                  value={form.value}
                  onChange={form.onChange}
                  size="lg"
                  style={{ minHeight: "50px" }}
                  required
                />
              </FloatingLabel>
            ))}
          </Form>

          {errorMessage && <p className={"text-danger"}>{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer className={cx("modal-footer")}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddMovie}>
            Add Movie
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMovie;
