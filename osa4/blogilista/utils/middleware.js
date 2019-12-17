const errorHandler = (error, request, response, next) => {
  console.error(error);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  response.status(404).end();
};

module.exports = { errorHandler };
