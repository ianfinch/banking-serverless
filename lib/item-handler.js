/**
 * Handle API requests operating on an item from a collection (e.g. /accounts/{id})
 */
const utils = require("./handler-utils.js");

/**
 * Find an item by id
 */
const getItemById = (Model, request, response) => {

    Model.findById(request.query.id)
        .then(result => utils.returnResult(result.data ? 200 : 404, request, response)(result))
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
