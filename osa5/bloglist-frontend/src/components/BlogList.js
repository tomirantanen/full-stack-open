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
  handleRemoveBlog,
  notify
}) => (
  <>
    <h1>Blogs</h1>
    <p>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
    <Togglable buttonLabel="new blog">
      <BlogForm handleCreateBlog={handleCreateBlog} notify={notify}></BlogForm>
    </Togglable>
    {blogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        handleUpdateBlog={handleUpdateBlog}
        handleRemoveBlog={handleRemoveBlog}
        notify={notify}
        user={user}
      ></Blog>
    ))}
  </>
);

export default BlogList;
