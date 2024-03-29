const CustomError = require("../utils/custom.error");

const errorMessages = {
    invalid_credentials: new CustomError("Invalid credentials.", "invalid-credentials", 401),
    user_not_found: new CustomError("User not found.", "user-not-found", 400),
    task_not_found: new CustomError("Task not found or you do not have privilege to access.", "task-not-found", 400),
    validation_error: new CustomError("Please check request body and parameters. It is not valid.", "validation-error", 400),
    user_not_have_email: new CustomError("User does not have email", "user-not-have-email", 400),
    google_oauth_error: new CustomError("Google OAuth 2.0 error.", "google-oauth-error", 500)
}

module.exports = errorMessages;