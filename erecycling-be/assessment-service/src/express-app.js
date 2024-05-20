const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const assessmentRouter = require("./routes/assessment.route");

const app = express();
app.use(cors());
// Set security HTTP headers
app.use(helmet());
app.use(express.json()) // for JSON
app.use(express.urlencoded({ extended: true }))
app.use(assessmentRouter);

// handle undefined Routes
app.use("*", (req, res, next) => {
    const err = new Error(`Undefined route: ${req.baseUrl}${req.path}`)
    next(err);
});

app.use((err, req, res, next) => {
    console.error("Error: ", err);
    res.status(500).json({
        status: 500,
        message: err.message,
    });
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";


})

module.exports = app;
