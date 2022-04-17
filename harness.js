/**
 * Grab env variables
 */
const dotenv = require("dotenv");
dotenv.config();

/**
 * Allow interrupts
 */
process.on("SIGINT", () => {
    console.info("Server received interrupt signal");
    process.exit();
});

/**
 * A response we can pass in to the handler
 */
const response = {
    status: s => { console.log("Status:", s); return response; },
    json: j => { console.log("Json:", JSON.stringify(j, null, 4)); return response; }
};

/**
 * Dynamically import the handler, so that the environmental variables have
 * been set up first
 */
import("./public/api/customers.js")
    .then(handler => {
        handler.default({}, response);
    });
