const express = require('express');
const movieRoute = express();

const MovieController = require('../controllers/MovieController');
const path = require("path");

const bodyParser = require('body-parser');
movieRoute.use(bodyParser.json());
movieRoute.use(bodyParser.urlencoded({ extended: true }));

movieRoute.set('view engine', 'pug');
movieRoute.set('views', path.join(__dirname, '../views'))

// movieRoute.get('/movies', (req, res) => {
//     res.render('AddMovie')
// })

movieRoute.get('/movies', MovieController.AllMovies);
movieRoute.get('/movie/:_id', MovieController.FindMovieById);
movieRoute.post('/movie', MovieController.AddMovie);
movieRoute.put('/movie/:_id', MovieController.EditMovie);
movieRoute.delete('/movie/:_id', MovieController.DeleteMovie);
movieRoute.post('/movie/add-link', MovieController.AddMovieByLink);

module.exports = movieRoute;