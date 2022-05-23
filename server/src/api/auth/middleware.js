const { getAuthAccessToken } = require('./services');

/**
 * @returns {import('express').RequestHandler}
 */
function checkAuthMiddleware() {
  return (req, res, next) => {
    const token = getAuthAccessToken(req);

    if (!token) {
      return next(new Error('A token is required for authentication'));
    }

    next();
  };
}

module.exports = {
  checkAuthMiddleware,
};
