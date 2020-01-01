import React from "react";
import { connect } from "react-redux";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { logoutUser } from "../reducers/userReducer";

const BlogList = ({ user, blogs, logoutUser }) => {
  const logout = () => {
    logoutUser();
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <>
      <h1>Blogs</h1>
      <p>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} user={user}></Blog>
      ))}
    </>
  );
};

const mapStateToProps = state => ({
  blogs: state.blogs
});

export default connect(mapStateToProps, { logoutUser })(BlogList);
