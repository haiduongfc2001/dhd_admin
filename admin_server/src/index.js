const db = require("./config/db");
const express = require("express");
const cors = require("cors");

const moment = require("moment-timezone");

const app = express();

require("dotenv").config();

const MovieRoute = require("./routes/MovieRoute");
const UserRoute = require("./routes/UserRoute");
const AdminRoute = require("./routes/AdminRoute");
const path = require("path");

// Connect to db
db.connect();

// Enable CORS
app.use(cors());

// phục vụ các tệp tin tĩnh từ thư mục tài nguyên
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", function (req, res) {
  res.send("Xin chào Đỗ Hải Dương!");
});

// For user route
app.use("/", MovieRoute);
app.use("/", UserRoute);
app.use("/admin", AdminRoute);

const dataMovies = require("./config/dataMovie.json");
app.get("/api/all-movies", async (req, res) => {
  res.json(dataMovies);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
