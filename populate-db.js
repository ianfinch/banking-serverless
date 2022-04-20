const dotenv = require("dotenv");
const mongoose = require("mongoose");

const models = require("./lib/models.js");

dotenv.config();

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

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
 * Save a product to the database
 */
const saveProduct = (Model, name, description, prerequisites) => {

    let doc;
    if (prerequisites) {
        doc = new Model({ name, description, prerequisites });
    } else {
        doc = new Model({ name, description });
    }

    return doc.save();
};

/**
 * Populate the products collection
 */
const populateProducts = () => {

    const Model = models.product.model;

    return Model.collection.drop()
            .then(() => saveProduct(Model, "Pet Insurance", "Round the clock care for your cat or dog - cover they deserve"))
            .then(() => saveProduct(Model, "Car Insurance", "Great value car insurance - simply the best"))
            .then(() => saveProduct(Model, "Home Insurance", "Great value, flexible five star rated home insurance"))
            .then(() => saveProduct(Model, "Home and Pet", "Insurance covering both your home and your pets", [ "Pet Insurance", "Home Insurance" ]))
            .then(() => saveProduct(Model, "Home and Car", "Insurance covering both your home and your cars", [ "Home Insurance", "Car Insurance" ]))
            .then(() => saveProduct(Model, "Complete Cover", "Insurance covering your home, your cars and your pets", [ "Home and Pet", "Home and Car" ]));
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
            .then(populateProducts)
            .then(mongoose.disconnect);
};

/**
 * Invoke main and catch any errors
 */
main()
    .catch ( err => console.log(err) );
