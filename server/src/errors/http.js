const BasicError = require('./base');

class HttpError extends BasicError {
  constructor(message, code = 'HTTP_ERROR') {
    super(message);
    this.code = code;
  }
}

module.exports = HttpError;
