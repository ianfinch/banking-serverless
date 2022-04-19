const collectionHandler = require("../../lib/collection-handler.js");
const models = require("../../lib/models.js");

export default collectionHandler(models.product.model);
