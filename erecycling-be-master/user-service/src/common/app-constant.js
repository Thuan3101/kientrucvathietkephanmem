const dotenv = require("dotenv");
dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT;

const MONGODB_HOSTNAME = process.env.MONGODB_HOSTNAME;

const MONGODB_PORT = process.env.MONGODB_PORT;

const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;

const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


module.exports = {
    PORT,
    MONGODB_HOSTNAME,
    MONGODB_PORT,
    MONGODB_DATABASE,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION,
    JWT_SECRET_KEY

};