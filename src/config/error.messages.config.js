const CustomError = require("../utils/custom.error");

const errorMessages = {
    invalid_credentials: new CustomError("Invalid Credentials", "invalid-credentials", 401)
}

module.exports = errorMessages;