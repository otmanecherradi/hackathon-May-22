const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const db = require('../../db');
const { tableNames } = require('../../db/constants');
const env = require('../../env');

/**
 *
 * @param {string} email
 */
function getUserByEmail(email) {
  return db(tableNames.USERS).where('email', '=', email).first();
}

/**
 *
 * @param {string} userId
 */
function getUserById(userId) {
  return db(tableNames.USERS).where('id', '=', userId).first();
}

/**
 *
 * @param {string} password
 */
function getHashedPassword(password) {
  return bcrypt.hash(password, env.SALT_ROUNDS);
}

/**
 *
 * @param {string} password
 * @param {string} hashedPassword
 */
function checkPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 *
 * @param {object} user
 * @param {string} user.full_name
 * @param {string} user.email
 * @param {string} user.password
 */
function createNewUser(user) {
  return db(tableNames.USERS).insert(user);
}

function signAccessToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: env.JWT_ACCESS_EXPIRY,
    issuer: 'api',
  });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: env.JWT_REFRESH_EXPIRY,
    issuer: 'api',
  });
}

function decodeAccessToken(token) {
  return jwt.decode(token, env.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: env.JWT_ACCESS_EXPIRY,
    issuer: 'api',
  });
}

function decodeRefreshToken(token) {
  return jwt.decode(token, env.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: env.JWT_REFRESH_EXPIRY,
    issuer: 'api',
  });
}

/**
 *
 * @param {any} data
 */
function encrypt(data) {
  const jwtEncodingCipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(env.JWT_DATA_SECRET, 'hex'),
    Buffer.from(env.JWT_DATA_IV, 'hex'),
  );

  let encrypted = jwtEncodingCipher.update(`${data}`, 'utf-8', 'hex');
  encrypted += jwtEncodingCipher.final('hex');

  return encrypted;
}

/**
 *
 * @param {string} data
 */
function decrypt(data) {
  const jwtDecodingCipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(env.JWT_DATA_SECRET, 'hex'),
    Buffer.from(env.JWT_DATA_IV, 'hex'),
  );

  let decrypted = jwtDecodingCipher.update(data, 'hex', 'utf-8');
  decrypted += jwtDecodingCipher.final('utf-8');

  return decrypted;
}

/**
 *
 * @param {object} args
 * @param {any} args.id
 */
function getUserTokens({ id }) {
  const encryptedUserId = encrypt(id);

  const accessToken = signAccessToken({ user: encryptedUserId, typ: 'access' });
  const refreshToken = signRefreshToken({
    user: encryptedUserId,
    typ: 'refresh',
  });

  return { accessToken, refreshToken };
}

/**
 *
 * @param {import('express').Request} req
 */
function getAuthAccessToken(req) {
  let token = null;

  if (req.headers.authorization) {
    const [kind, headerToken] = req.headers.authorization.split(' ');
    if (kind === 'Bearer' && headerToken) {
      token = headerToken;
    }
  } else if (req.body.accessToken) {
    token = req.body.accessToken;
  } else if (req.query.accessToken) {
    token = req.query.accessToken;
  }

  return token;
}

/**
 *
 * @param {string} token
 */
function getUserIdFromAccessToken(token) {
  const payload = decodeAccessToken(token);

  const decryptedUserId = decrypt(payload.user);

  return {
    userId: decryptedUserId,
    type: payload.typ,
  };
}

/**
 *
 * @param {import('express').Request} req
 */
function getUserFromAuthAccessToken(req) {
  const token = getAuthAccessToken(req);

  const { userId } = getUserIdFromAccessToken(token);

  return getUserById(userId);
}

/**
 *
 * @param {string} token
 */
function getUserIdFromRefreshToken(token) {
  const payload = decodeRefreshToken(token);

  const decryptedUserId = decrypt(payload.user);

  return {
    userId: decryptedUserId,
    type: payload.typ,
  };
}

module.exports = {
  getUserByEmail,
  getUserById,
  getHashedPassword,
  checkPassword,
  createNewUser,
  getUserTokens,
  getAuthAccessToken,
  getUserIdFromAccessToken,
  getUserFromAuthAccessToken,
  getUserIdFromRefreshToken,
};
