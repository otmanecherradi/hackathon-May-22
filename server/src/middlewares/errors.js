const { HttpError } = require('../errors');
const env = require('../env');

/**
 *
 * @returns {import('express').RequestHandler}
 */
function notFound() {
  return async function (req, res, next) {
    const error = new HttpError('💀 - 404 Not Found - 💀');
    res.status(404);
    next(error);
  };
}

/**
 *
 * @returns {import('express').ErrorRequestHandler}
 */
function errorHandler() {
  // eslint-disable-next-line no-unused-vars
  return async function (error, req, res, next) {
    let statusCode = error.statusCode || 500;
    if (statusCode < 400) {
      statusCode = 500;
    }

    if (env.NODE_ENV !== 'production') {
      console.error(error);
    }

    res.status(statusCode);

    return res.json({
      error: {
        message: error.message,
        code: error.code,
        status: statusCode,
        stack: env.NODE_ENV === 'production' ? '💀 PRODUCTION 💀' : error.stack,
      },
      status: 'ERROR',
    });
  };
}

module.exports = {
  notFound,
  errorHandler,
};
