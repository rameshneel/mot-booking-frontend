// src/utils/ApiError.js

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.stack = stack || new Error().stack;
    this.success = false;
  }
}

export { ApiError };
