import mongoosePromise from "../../lib/mongodb.js";

export default function handler(request, response) {
  mongoosePromise
    .then(mongoose => {
        response.status(200).json({
            body: {a: "hello", b: "world", mongoose: mongoose.version}
        });
    });
}
