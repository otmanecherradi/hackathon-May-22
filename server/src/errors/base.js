const { HTTP_500_INTERNAL_SERVER_ERROR } = require('../utils/status');

class BasicError extends Error {
  constructor(message, code = 'BASIC_ERROR') {
    super(message);
    this.code = code;

    this.status = HTTP_500_INTERNAL_SERVER_ERROR;
  }
}

module.exports = BasicError;
