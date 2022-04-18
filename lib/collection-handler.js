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
const returnResult = (status, request, response) => {

    return data => {

        response.status(status).json({
            body: {
                response: {
                    status,
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
        .then(returnResult(200, request, response));
};

/**
 * Create a new item in the collection
 */
const createItem = (Model, request, response) => {

    const doc = new Model(request.body);
    doc.save()
        .then(returnResult(201, request, response))
        .catch(returnResult(400, request, response));
};

/**
 * Return a function handler for the passed in model
 */
module.exports = Model => {

    const methodsSupported = {
        GET: getCollectionItems,
        POST: createItem
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
