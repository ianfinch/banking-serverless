const mongoosePromise = require("../../lib/mongodb.js");
const models = require("../../lib/models.js");

/**
 * Remove the __v value from the results
 */
const simplifyResult = data => {

    return data.map(entry => {
        delete entry.__v;
        return entry;
    });
};

/**
 * Submit the response back to the API call
 */
const returnResult = (request, response) => {

    return data => {

        response.status(200).json({
            body: { status: 200, data }
        });

        return data;
    };
};

/**
 * The function handler itself
 */
export default function handler(request, response) {

  mongoosePromise
    .then(mongoose => {

        const Model = models.person.model;
        Model.find()
            .then(simplifyResult)
            .then(returnResult(request, response));
    });
}
