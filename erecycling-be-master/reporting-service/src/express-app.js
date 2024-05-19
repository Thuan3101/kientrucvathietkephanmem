const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const reportingRouter = require("./routes/reporting.route");

const app = express();
app.use(cors());
// Set security HTTP headers
app.use(helmet());
app.use(reportingRouter);

module.exports = app;
