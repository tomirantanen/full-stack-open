import React from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = ({
  user,
  blogs,
  handleLogout,
  handleCreateBlog,
  handleUpdateBlog,
  handleRemoveBlog
}) => (
  <>
    <h1>Blogs</h1>
    <p>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
    <Togglable buttonLabel="new blog">
      <BlogForm handleCreateBlog={handleCreateBlog}></BlogForm>
    </Togglable>
    {blogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        handleUpdateBlog={handleUpdateBlog}
        handleRemoveBlog={handleRemoveBlog}
        user={user}
      ></Blog>
    ))}
  </>
);

export default BlogList;
