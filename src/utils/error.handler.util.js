const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.status && typeof err.status === 'number') {
    statusCode = err.status;
  }
  if (err.message && typeof err.message === 'string') {
    message = err.message;
  }

  // Handle specific known errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate key error';
  }

  res.status(statusCode);
  res.json({ errorMessage: message });
};

module.exports = errorHandler;