const itemHandler = require("../../../lib/item-handler.js");
const models = require("../../../lib/models.js");

export default itemHandler(models.person.model);
