import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { setNotification } from "../reducers/notificationReducer";
import { removeBlog, addLikeToBlog } from "../reducers/blogReducer";

const Blog = ({ blog, history }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const openDetails = () => history.push(`/blogs/${blog.id}`);

  return (
    <div style={blogStyle}>
      <p className="blog-title" onClick={openDetails}>
        {blog.title} {blog.author}
      </p>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  connect(null, {
    setNotification,
    removeBlog,
    addLikeToBlog
  })
)(Blog);
