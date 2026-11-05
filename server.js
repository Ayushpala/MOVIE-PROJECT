const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

app.use(express.json());

connectDB();

// app.get("/", (req, res) => {
//     res.send("Movie Management Server Running");
// })

const movieRoutes = require("./routes/movieroutes");

app.use("/", movieRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () => {
    console.log("Server Running Successfully");
})