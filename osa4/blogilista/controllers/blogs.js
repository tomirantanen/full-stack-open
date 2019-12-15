const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  console.log("GET /api/blogs");
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  console.log("POST /api/blogs");
  const blog = new Blog(request.body);

  blog.save().then(result => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
