/**
 * Handle API requests operating on a collection (e.g. /accounts)
 */
const mongoosePromise = require("./mongodb.js");

/**
 * Remove the __v value from the results
 */
const simplifyResult = data => {

    return data.map(entry => {
        const obj = entry.toObject();
        delete obj.__v;
        return obj;
    });
};

/**
 * Submit the response back to the API call
 */
const returnResult = (request, response) => {

    return data => {

        response.status(200).json({
            body: {
                response: {
                    status: 200,
                },
                request: {
                    method: request.method,
                    headers: request.headers,
                    cookies: request.cookies,
                    query: request.query,
                    body: request.body
                },
                data
            }
        });

        return data;
    };
};

/**
 * Get the items from a collection
 */
const getCollectionItems = (Model, request, response) => {

    Model.find()
        .then(simplifyResult)
        .then(returnResult(request, response));
};

/**
 * Return a function handler for the passed in model
 */
module.exports = Model => {

    const methodsSupported = {
        GET: getCollectionItems
    };

    return function (request, response) {

        mongoosePromise
            .then(mongoose => {

                if (methodsSupported[request.method]) {
                    methodsSupported[request.method](Model, request, response);

                } else {
                    response
                        .status(405)
                        .setHeader("Allow", Object.keys(methodsSupported).join(", "))
                        .send("Method Not Allowed");
                }
            });
    };
};
