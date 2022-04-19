const faker = require("faker");
const mongoose = require("mongoose");

/**
 * Take a model template and return a function which creates an object of synthesised data
 */
const createData = template => {

    return () => {
        return Object.keys(template).reduce((obj, key) => Object.assign(obj, { [key]: template[key].generator() }), {});
    };
};

/**
 * Return the return value for a model
 */
const modelReturnStructure = (modelName, template) => {

    return {
        data: createData(template),
        model: mongoose.model(modelName, new mongoose.Schema(template))
    };
};

/**
 * Create our person model
 */
const personModel = () => {

    const template = {
        title: {
            type: "String",
            required: true,
            enum: [ "Mr", "Mrs", "Miss", "Ms", "Dr" ],
            generator: () => faker.name.prefix().replace(".", "")
        },
        firstName: {
            type: "String",
            required: true,
            generator: faker.name.firstName,
        },
        lastName: {
            type: "String",
            required: true,
            generator: faker.name.lastName
        }
    };

    return modelReturnStructure("Persons", template);
};

/**
 * What does a person's contact details look like?
 */
const contactModel = () => {

    const template = {
        street: {
            type: "String",
            generator: faker.address.streetAddress
        },
        city: {
            type: "String",
            generator: faker.address.cityName
        },
        county: {
            type: "String",
            generator: faker.address.county
        },
        postCode: {
            type: "String",
            generator: faker.address.zipCode
        },
        phone: {
            type: "String",
            generator: faker.phone.phoneNumber
        },
        email: {
            type: "String",
            generator: faker.internet.email
        }
    };

    return modelReturnStructure("Contacts", template);
};


/**
 * What does a bank account contain?
 */
const accountModel = () => {

    const template = {
        sortCode: {
            type: "String",
            generator: () => ("" + (faker.datatype.number() * 1000 + faker.datatype.number())).replace(/(..)(..)(..).*/, '$1-$2-$3')
        },
        accountNumber: {
            type: "String",
            generator: faker.finance.account
        },
        branch: {
            type: "String",
            generator: () => faker.address.streetName() + ", " + faker.address.cityName() + ", " + faker.address.zipCode()
        },
        balance: {
            type: "String",
            generator: faker.finance.amount
        }
    };

    return modelReturnStructure("Accounts", template);
};

/**
 * What does a transaction look like?
 */
const transactionModel = () => {

    const template = {
        date: {
            type: "String",
            generator: faker.date.recent
        },
        description: {
            type: "String",
            generator: faker.finance.transactionDescription
        }
    };

    return modelReturnStructure("Transactions", template);
};

/**
 * List of products a customer can choose
 */
const productModel = () => {

    const template = {

        name: {
            type: "String",
            required: true
        },
        description: {
            type: "String",
            required: true
        }
    };

    return {
        data: null,
        model: mongoose.model("Products", new mongoose.Schema(template))
    };
};

module.exports = {
    account: accountModel(),
    contact: contactModel(),
    person: personModel(),
    product: productModel(),
    transaction: transactionModel()
};
