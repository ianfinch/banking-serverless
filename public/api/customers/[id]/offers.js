const utils = require("../../../../lib/handler-utils.js");

export default function(request, response) {

    Promise.resolve("TEST CALL")
        .then(utils.returnResult(200, request, response));
};
