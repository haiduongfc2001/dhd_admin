const Movie = require("../models/MovieModel/MovieModel");
const axios = require("axios");

// Tất cả movie
const AllMovies = async (req, res) => {
    // try {
    //     const movies = await Movie.find()
    //     res.json(movies);
    // } catch (error) {
    //     res.send(error.message);
    // }

    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Tìm movie theo id
const FindMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params._id);

        if (movie) {
            res.json(movie);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Thêm movie
const AddMovie = async (req, res) => {
    try {

        const movie = new Movie(req.body);
        await movie.save();
        res.status(200).json(movie);

    } catch (error) {
        res.send(error.message);
    }
}

// Sửa thông tin movie
const EditMovie = async (req, res) => {
    try {
        const { title, overview, poster_path } = req.body;

        const movieId = req.params._id;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            { title, overview, poster_path },
            { new: true });

        res.status(200).json(updatedMovie);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa movie
const DeleteMovie = async (req, res) => {
    try {
        const deleteMovie = await Movie.findOneAndRemove({_id: req.params._id});

        if (deleteMovie) {
            res.send(`Movie ${req.params._id} deleted successfully!`);
        } else {
            res.send(`Movie ${req.params._id} not found!`);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// // Delete a movie
// app.delete('/movie/:_id', (req, res) => {
//     Movie.findOneAndRemove({_id: req.params._id}).then((movie) => {
//         if (movie) {
//             res.send(`Movie ${req.params._id} deleted successfully!`);
//         } else {
//             res.send(`Movie ${req.params._id} not found!`);
//         }
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).send('Error deleting movie');
//     });
// });

const AddMovieByLink = async (req, res) => {
    try {
        // const movie = new Movie(req.body);
        // await movie.save();
        // res.status(200).json(movie);

        // Access the link value from the request body
        const { link } = req.body;

        // Make a request to fetch the movie data based on the provided link
        const response = await axios.get(link);
        const movieData = response.data;

        // Process the movie data and add it to your database or perform any other necessary operations
        // Replace this logic with your actual implementation to add the movie based on the provided link

        // Create a new movie instance
        const newMovie = new Movie({
            ...movieData,
        });

        // Save the movie to the database
        const savedMovie = await newMovie.save();

        // Return a success response with the saved movie data
        res.status(201).json(savedMovie);

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    AllMovies,
    FindMovieById,
    AddMovie,
    EditMovie,
    DeleteMovie,
    AddMovieByLink
}
