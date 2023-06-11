const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Movie = new Schema({
    adult: {
      type: Boolean,
      default: false,
    },
    backdrop_path: {
        type: String,
    },
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
    },
    production_companies: [
        {
            id: {
                type: Number,
            },
            logo_path: {
                type: String,
            },
            name: {
                type: String,
            },
            origin_country: {
                type: String,
            },
        }
    ],
    release_date: {
        type: Date,
    },
    status: {
        type: String,
    },
    vote_count_user: {
        type: Number,
        default: 0,
    },
    vote_average_user: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('Movie', Movie);