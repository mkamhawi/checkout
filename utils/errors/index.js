/* eslint-disable max-classes-per-file */
class HTTPError extends Error {
  constructor(statusCode, message, details) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}

class InvalidRequestError extends HTTPError {
  constructor(details) {
    super(400, 'Invalid request', details);
  }
}

class NotFoundError extends HTTPError {
  constructor(details) {
    super(404, 'Resource not found', details);
  }
}

class ServerError extends HTTPError {
  constructor(details) {
    super(500, 'Unexpected error', details);
  }
}

module.exports = {
  HTTPError,
  InvalidRequestError,
  NotFoundError,
  ServerError
};
