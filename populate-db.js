const dotenv = require("dotenv");
const mongoose = require("mongoose");

const models = require("./models.js");

dotenv.config();

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@banking.ryfuw.mongodb.net/banking?retryWrites=true&w=majority`

/**
 * Allow Control-C interrupt
 */
process.on("SIGINT", () => {
    console.info("Server received interrupt signal");
    process.exit();
});

/**
 * Populate a collection
 */
const populateCollection = (modelName, numberOfItems) => {

    return () => {

        const Model = models[modelName].model;

        const savesChain = [...Array(numberOfItems)].reduce((prev, current) => {
            const doc = new Model(models[modelName].data());
            return prev.then(() => doc.save());
        }, Model.collection.drop());

        return savesChain;
    };
};

/**
 * Our main code to connect to Mongo and populate our data
 */
const main = () => {

    return mongoose.connect(connectionString, { useNewUrlParser: true })
            .then( () => console.log("Connected to MongoDB database") )
            .then(populateCollection("person", 20))
            .then(populateCollection("contact", 30))
            .then(populateCollection("account", 30))
            .then(populateCollection("transaction", 300))
            .then(mongoose.disconnect);
};

/**
 * Invoke main and catch any errors
 */
main()
    .catch ( err => console.log(err) );
