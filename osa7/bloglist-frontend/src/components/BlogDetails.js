import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { setNotification } from "../reducers/notificationReducer";
import { removeBlog, addLikeToBlog } from "../reducers/blogReducer";

const BlogDetails = ({
  blog,
  user,
  setNotification,
  removeBlog,
  addLikeToBlog,
  history
}) => {
  if (!user || !blog) {
    return null;
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const isRemovable = blog.user.username === user.username;

  const addLike = async () => {
    try {
      await addLikeToBlog(blog);
    } catch (error) {
      console.error(error);
      setNotification(`Could not add like to blog ${blog.title}`, "error");
    }
  };

  const remove = async () => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) {
      return;
    }

    try {
      await removeBlog(blog);
      history.push("/");
    } catch (error) {
      console.error(error);
      setNotification("Could not remove blog", "error");
    }
  };

  return blog ? (
    <div style={blogStyle}>
      <h2>{blog.title}</h2>

      <p>{blog.url}</p>
      <p className="likes">
        {blog.likes} likes <button onClick={addLike}>like</button>
      </p>
      <p>Added by {blog.user.username}</p>
      {isRemovable ? <button onClick={remove}>remove</button> : null}
    </div>
  ) : null;
};

const mapStateToProps = state => ({
  user: state.user
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    setNotification,
    removeBlog,
    addLikeToBlog
  })
)(BlogDetails);
