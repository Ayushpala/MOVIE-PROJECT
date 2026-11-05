const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieName : {
        type : String,
        required : true
    },

    director : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },

    releaseYear : {
        type : Number,
        required : true
    },

    poster : {
        type : String,
        required : false
    }
})

const movie = mongoose.model("movie", movieSchema)

module.exports = movie;