/**
 * Handle API requests operating on an item from a collection (e.g. /accounts/{id})
 */
const utils = require("./handler-utils.js");

/**
 * Find an item by id
 */
const getItemById = (Model, request, response) => {

    Model.findById(request.query.id)
        .then(data => utils.returnResult(data ? 200 : 404, request, response)(data))
        .catch(utils.returnResult(400, request, response));
};

/**
 * Update an item by id
 */
const updateItemById = (Model, request, response) => {

    const updatedDoc = new Model(Object.assign({}, request.body, { _id: request.query.id }));
    doc.save()
        .then(utils.returnResult(200, request, response))
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
        GET: getItemById,
        OPTIONS: handleOptions,
        PUT: updateItemById
    }, Model);
};
