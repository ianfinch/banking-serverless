const utils = require("../../../../lib/handler-utils.js");
const models = require("../../../../lib/models.js");

/**
 * Filter the offers based on products a customer has already purchased
 */
const filterByPrerequisites = ([ customer, products ]) => {

    return products.filter(product => {

        if (!product.prerequisites || product.prerequisites.length === 0) {
            return true;
        }

        return false;
    });
};

/**
 * The request handler
 */
export default function(request, response) {

    const customerModel = models.person.model;
    const productModel = models.product.model;

    Promise.all([
        customerModel.findById(request.query.id),
        productModel.find()
    ]).then(filterByPrerequisites)
      .then(utils.returnResult(200, request, response));
};
