const utils = require("../../../../lib/handler-utils.js");
const models = require("../../../../lib/models.js");

export default function(request, response) {

    const customerModel = models.person.model;
    const productModel = models.product.model;

    Promise.all([
        customerModel.findById(request.query.id),
        productModel.find()
    ]).then(utils.returnResult(200, request, response));
};
