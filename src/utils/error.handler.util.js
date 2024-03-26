const CustomError = require("./custom.error");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorJSON = { message: 'Internal Server Error' };

  if (err.status && typeof err.status === 'number') {
    statusCode = err.status;
  }
  if (err.message && typeof err.message === 'string') {
    errorJSON.message = err.message;
  }

  // Handle specific known errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorJSON.message = 'Validation error';
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    statusCode = 400;
    errorJSON.message = 'Duplicate key error';
  } else if (err instanceof CustomError) {
    errorJSON.message = err.message;
    if(err.statusCode)
      statusCode = err.statusCode;
    if(err.name)
      errorJSON.name = err.name;
  }

  res.status(statusCode);
  res.json(errorJSON);
};

module.exports = errorHandler;