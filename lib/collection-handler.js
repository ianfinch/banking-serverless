/**
 * Handle API requests operating on a collection (e.g. /accounts)
 */
const utils = require("./handler-utils.js");

/**
 * Get the items from a collection
 */
const getCollectionItems = (Model, request, response) => {

    Model.find()
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
 * Return a function handler for the passed in model
 */
module.exports = Model => {

    return utils.setupHandler({
        GET: getCollectionItems,
        POST: createItem
    }, Model);
};
