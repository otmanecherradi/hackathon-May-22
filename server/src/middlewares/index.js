const { notFound, errorHandler } = require('./errors');

const errorMiddleware = {
  notFound,
  errorHandler,
};

module.exports = { errorMiddleware };
