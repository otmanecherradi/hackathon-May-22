const { config } = require('dotenv');

config();

const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT;

const DATABASE_NAME = process.env.DATABASE_NAME;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PORT = process.env.MYSQL_PORT;

const ROUNDS = process.env.ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

// Add additional variables here
// const VAR_1 = process.env.VAR_1;

// Add the variables here to have intellisense
const env = {
  NODE_ENV,

  PORT,

  DATABASE_NAME,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_PORT,

  ROUNDS,
  JWT_SECRET,
  JWT_EXPIRY,

  // VAR_1,
};

Object.entries(env).forEach(([name, value]) => {
  if (!value) {
    throw new Error(`${name} is not specified in the .env file!`);
  }
});

module.exports = env;
