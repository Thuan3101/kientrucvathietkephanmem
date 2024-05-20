const {
    MONGODB_HOSTNAME,
    MONGODB_PASSWORD,
    MONGODB_USERNAME,
    MONGODB_DATABASE,
} = require("./../common/app-constant");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const LOCAL_CONN_STRING = `mongodb://localhost:27017/${MONGODB_DATABASE}`;
const ATLAS_CONN_STRING = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOSTNAME}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

const connect = () => {
    new Promise((resolve, reject) => {
        mongoose.connect(
            LOCAL_CONN_STRING,
            // {
            //     useCreateIndex: true,
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     useFindAndModify: false,
            // }
        );

        const db = mongoose.connection;

        db.once("connected", () => {
            console.log("✅ MongoDB: connected!");
            resolve();
        });

        db.on("error", (error) => {
            console.error("❌ MongoDB: error");
            reject(error);
        });
    });
};

module.exports = { connect, AutoIncrement };
