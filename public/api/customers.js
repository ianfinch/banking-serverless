import mongoosePromise from "../../lib/mongodb.js";
const models = require("../../lib/models.js");

export default function handler(request, response) {
  mongoosePromise
    .then(mongoose => {

        const Model = models.person.model;
        Model.find()
            .then(data => {
                response.status(200).json({
                    body: { mongoose: mongoose.version, data }
                });
            });
    });
}
