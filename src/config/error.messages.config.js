const CustomError = require("../utils/custom.error");

const errorMessages = {
    invalid_credentials: new CustomError("Invalid credentials.", "invalid-credentials", 401),
    user_not_found: new CustomError("User not found.", "user-not-found", 400),
    task_not_found: new CustomError("Task not found or you do not have privilege to access.", "task-not-found", 400),
    validation_error: new CustomError("Please check request body and parameters. It is not valid.", "validation-error", 400)
}

module.exports = errorMessages;