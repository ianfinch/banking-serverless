/**
 * Utility functions needed across different handler modules
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
 * Given a set of supported methods, call the appropriate one
 *
 * methodsSupported is an object where the field names are HTTP methods and the
 * values are the functions to call when that method is requested.  The
 * functions to be involved take three parameters - a mongoose model, the
 * request received, and the response object to use to construct and send a
 * response.
 */
const setupHandler = (methodsSupported, Model) => {

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

module.exports = {
    returnResult,
    setupHandler,
    simplifyResult
};
