/**
 * Handle API requests operating on a collection (e.g. /accounts)
 */
const utils = require("./handler-utils.js");

/**
 * Get the items from a collection
 *
 * We pass the query string into the find(), so that if any parameters are
 * passed with the request we use them to filter the search
 */
const getCollectionItems = (Model, request, response) => {

    Model.find(request.query)
        .then(utils.simplifyResult)
        .then(utils.returnResult(200, request, response));
};

/**
 * Create a new item in the collection
 */
const createItem = (Model, request, response) => {

    const doc = new Model(request.body);
    doc.save()
        .then(utils.returnResult(201, request, response))
        .catch(utils.returnResult(400, request, response));
};

/**
 * Need to support OPTIONS requests in case we need to handle CORS
 */
const handleOptions = (Model, request, response) => {

    response.status(200).send("OK");
};

/**
 * Return a function handler for the passed in model
 */
module.exports = Model => {

    return utils.setupHandler({
        GET: getCollectionItems,
        OPTIONS: handleOptions,
        POST: createItem
    }, Model);
};
