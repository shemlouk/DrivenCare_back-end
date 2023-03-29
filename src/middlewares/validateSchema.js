const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      error.statusCode = 422;
      next(error);
    }
    next();
  };
};

export default validateSchema;
