const express = require("express");

const router = express.Router();

const movieController = require("../controllers/movieController");
const upload = require("../middleware/upload");

router.get("/", movieController.home);
router.post("/addMovie", upload.single("poster") , movieController.addMovie);
router.get("/movies", movieController.getAllMovies);
router.get("/movies/:id", movieController.getSingleMovie);
router.put("/editMovie/:id", upload.single("poster"),movieController.editMovie)
router.delete("/deleteMovie/:id", movieController.deleteMovie)
router.delete("/deleteImage/:id", movieController.deleteImage)

module.exports = router;