class CustomError extends Error {
  constructor(message, statusCode = 500, name = "Internal Server Error") {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class ValidationError extends CustomError {
  constructor(message, opt = []) {
    super(message, 400, "ValidationError");
    this.detail = opt;
  }
}

class DbValidationError extends ValidationError {
  constructor(message, opt = []) {
    super(message, opt);
    this.statusCode = 500;
    this.name = "DbValidationError";
  }
}

class SchemaNotFoundError extends CustomError {
  constructor(message) {
    super(message, 500, "SchemaNotFoundError");
  }
}

class AuthError extends CustomError {
  constructor(message) {
    super(message, 401, "Unauthorized");
  }
}

export {
  CustomError,
  ValidationError,
  DbValidationError,
  SchemaNotFoundError,
  AuthError,
};
