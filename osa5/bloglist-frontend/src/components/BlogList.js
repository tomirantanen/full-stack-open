import React from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const BlogList = ({ user, blogs, handleLogout, handleCreateBlog, notify }) => (
  <>
    <h1>Blogs</h1>
    <p>{user.name} logged in</p>
    <button onClick={handleLogout}>logout</button>
    <BlogForm handleCreateBlog={handleCreateBlog} notify={notify}></BlogForm>
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog}></Blog>
    ))}
  </>
);

export default BlogList;
