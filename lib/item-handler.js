/**
 * Handle API requests operating on an item from a collection (e.g. /accounts/{id})
 */
const utils = require("./handler-utils.js");

/**
 * Find an item by id
 */
const getItemById = (Model, request, response) => {

    Model.findById(request.query.id)
        .then(utils.returnResult(200, request, response))
        .catch(utils.returnResult(400, request, response));
};

/**
 * Return a function handler for the passed in model
 */
module.exports = Model => {

    return utils.setupHandler({
        GET: getItemById
    }, Model);
};
