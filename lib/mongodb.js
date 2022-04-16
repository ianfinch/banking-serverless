const mongoose = require("mongoose");

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

const mongoosePromise = mongoose.connect(connectionString, { useNewUrlParser: true });

module.exports = mongoosePromise;
