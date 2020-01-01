import React from "react";
import { connect } from "react-redux";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = ({ user, blogs, handleLogout }) => (
  <>
    <h1>Blogs</h1>
    <p>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
    <Togglable buttonLabel="new blog">
      <BlogForm />
    </Togglable>
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} user={user}></Blog>
    ))}
  </>
);

const mapStateToProps = state => ({
  blogs: state.blogs
});

export default connect(mapStateToProps)(BlogList);
