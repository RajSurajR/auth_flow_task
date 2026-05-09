export class AppError extends Error {

  constructor(message, statusCode, code=500) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}