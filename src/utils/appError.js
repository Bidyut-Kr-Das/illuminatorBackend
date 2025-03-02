class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(`4`) ? `fail` : `error`;
    this.message = message;
    this.isOperational = true;
  }
}

export default AppError;
