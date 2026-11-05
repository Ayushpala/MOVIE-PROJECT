const fs = require("fs");
const path = require("path");

const home = (req, res) => {
    res.send("Welcome To Movie Management System");
}

const Movie = require("../models/movie");

const addMovie = async (req, res) => {
    try{
        const{
            movieName,
            director,
            category,
            releaseYear,
        } = req.body;

        const poster = req.file ? req.file.filename : null;

        const movie = new Movie({
            movieName,
            director,
            category,
            releaseYear,
            poster
        })

        await movie.save();

        res.status(201).json({
            success : true,
            message : "Movie Added Successfully",
            movie
        })

    } catch(error){
        res.status(500).json({
            success : false,
            message : "Something Went Wrong",
            error : error.message
        })
    }
}

const getAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find();

        res.status(200).json({
            success : true,
            count : movies.length,
            movies
        })

    } catch (error){
        res.status(500).json({
            success : false,
            message : "Something Went Wrong",
            error : error.message
        })
    }
}

const getSingleMovie = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);

        if(!movie) {
            return res.status(404).json({
                success : false,
                message : "Movie Not Found"
            })
        }

        res.status(200).json({
            success : true,
            movie
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something Went Wrong",
            error : error.message
        })
    }
}

const editMovie = async(req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);

        if(!movie){
            return res.status(404).json({
                success : false,
                message : "Movie Not Found"
            })
        }

        const {movieName, director, category, releaseYear} = req.body;

        movie.moviName = movieName || movie.movieName;
        movie.director = director || movie.director;
        movie.category = category || movie.category;
        movie.releaseYear = releaseYear || movie.releaseYear;

        if(req.file){
            if(movie.poster){
                const oldPath = path.join(
                    __dirname,
                    "..",
                    "uploads",
                    movie.poster
                );

                if(fs.existsSync(oldPath)){
                    fs.unlinkSync(oldPath);
                }
            }

            movie.poster = req.file.filename;
        }

        await movie.save();

        res.status(200).json({
            success : true,
            message : "Movie Updated Successfully",
            movie
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something Went Wrong",
            error : error.message
        })
    }
}

const deleteMovie = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);

        if(!movie) {
            return res.status(404).json({
                success : false,
                message : "Movie Not Found"
            })
        }

        if(movie.poster){
            const posterPath = path.join(
                __dirname,
                "..",
                "uploads",
                movie.poster
            )

            if(fs.existsSync(posterPath)){
                fs.unlinkSync(posterPath);
            }
        }

        await Movie.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success : true,
            message : "Movie Deleted Successfully"
        })

    } catch(error) {
        res.status(500).json({
            success : false,
            message : "Something Went Wrong",
            error : error.message
        })
    }
}

const deleteImage = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);

        if(!movie) {
            return res.status(404).json({
                success : false,
                message : "Movie Not Found"
            })
        }

        if(!movie.poster){
            return res.status(400).json({
                success : false,
                message : "No Poster To Delete"
            });
        }

        const posterPath = path.join(
            __dirname,
            "..",
            "uploads",
            movie.poster
        );
        
        if(fs.existsSync(posterPath)){
            fs.unlinkSync(posterPath);
        }

        movie.poster = null;

        await movie.save();

        res.status(200).json({
            success : true,
            message : "Movie Deleted Successfully"
        })


        // await Movie.findByIdAndDelete(req.params.id);


    } catch(error) {
        res.status(500).json({
            success : false,
            message : "Something Went Wrong",
            error : error.message
        })
    }
}



module.exports = {
    home,
    addMovie,
    getAllMovies,
    getSingleMovie,
    editMovie,
    deleteMovie,
    deleteImage
}

