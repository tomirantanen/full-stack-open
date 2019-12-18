import React from "react";
import Blog from "./Blog";

const BlogList = ({ user, blogs, handleLogout }) => (
  <>
    <h1>Blogs</h1>
    <p>{user.name} logged in</p>
    <button onClick={handleLogout}>logout</button>
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog}></Blog>
    ))}
  </>
);

export default BlogList;
