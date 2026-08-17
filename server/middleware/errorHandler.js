const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message: message
  });
};

export default errorHandler;
