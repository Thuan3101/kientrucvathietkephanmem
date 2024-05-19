const express = require("express")
const proxy = require("express-http-proxy")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userProxy = proxy("http://localhost:9092");
const assessmentProxy = proxy("http://localhost:9095");
const inquiryProxy = proxy("http://localhost:9094")

app.use("/api/user", userProxy);
app.use("/api/assessment", assessmentProxy);
app.use("/api/inquiry", inquiryProxy)

const server = app.listen(9090, () => {
    console.log("Gateway is Listening to Port 9090");
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);