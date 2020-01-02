const errorHandler = (error, request, response, next) => {
  console.error(error);
  if (error.name === "ValidationError" || error.name === "SyntaxError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Invalid token" });
  }
  response.status(404).end();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

module.exports = { errorHandler, tokenExtractor };
