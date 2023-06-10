const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Movie = new Schema({
    id: {
      type: Number,
    },
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    genres: [
        {
            id: {
                type: String,
                // required: true
            },
            name: {
                type: String,
                // required: true
            }
        }
    ],
    poster_path: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Movie', Movie);