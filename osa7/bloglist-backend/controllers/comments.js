const commentsRouter = require("express").Router();

const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentsRouter.post("/:id/comments", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    const comment = new Comment({
      text: request.body.text,
      blog: blog._id
    });

    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();
    response.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
