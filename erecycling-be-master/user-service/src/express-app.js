const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRouter = require("./routes/user.route");

const app = express();
app.use(cors());
// Set security HTTP headers
app.use(helmet());
app.use(express.json()) // for JSON
app.use(express.urlencoded({ extended: true})) // for form data
app.use(userRouter);

module.exports = app;
