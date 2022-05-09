const jwt = require('jsonwebtoken');

const env = require('../../env');

function getToken(data) {
  return jwt.sign(data, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRY });
}

function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}

module.exports = {
  getToken,
  verifyToken,
};
