class HttpError extends Error {
  constructor(message, StatusCode) {
    super(message);
    this.code = StatusCode;
  }
}

module.exports = HttpError;
