const errorHandler = (err, req, res) => {
  const { statusCode, message } = err;
  console.error(message);
  res.status(statusCode || 500).json(message);
};

export default errorHandler;
