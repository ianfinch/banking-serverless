const utils = require("../../../../lib/handler-utils.js");
const models = require("../../../../lib/models.js");

/**
 * Filter the offers based on products a customer has already purchased
 */
const filterProducts = ([ customer, products ]) => {

    // First pass is to filter out products the customer already has, or
    // products which the customer is not eligible for
    return products.filter(product => {

        // Don't include a product the customer has already bought
        if (customer.purchased.includes(product.name)) {
            return false;
        }

        // If there are no prerequisites, just include the product
        if (!product.prerequisites || product.prerequisites.length === 0) {
            return true;
        }

        // Check whether the customer has met any prerequisites
        const metPrerequisites = product.prerequisites.filter(prereq => customer.purchased.includes(prereq));
        if (metPrerequisites.length > 0) {
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
    ]).then(filterProducts)
      .then(utils.returnResult(200, request, response));
};
