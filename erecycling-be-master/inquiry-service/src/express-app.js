const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const inquiryRouter = require('./routes/inquiry.route')

const app = express();
app.use(cors());
// Set security HTTP headers
app.use(helmet());
app.use(express.json()) // for JSON
app.use(express.urlencoded({ extended: true})) // for form data
app.use(inquiryRouter);

module.exports = app;
