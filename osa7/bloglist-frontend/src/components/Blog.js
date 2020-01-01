import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setNotification } from "../reducers/notificationReducer";
import { removeBlog, addLikeToBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user, setNotification, removeBlog, addLikeToBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };
  const isRemovable = blog.user.username === user.username;
  const toggleDetails = () => setShowDetails(!showDetails);

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
    } catch (error) {
      console.error(error);
      setNotification("Could not remove blog", "error");
    }
  };

  return (
    <div style={blogStyle}>
      <p className="blog-title" onClick={toggleDetails}>
        {blog.title} {blog.author}
      </p>
      {showDetails ? (
        <>
          <p>{blog.url}</p>
          <p className="likes">
            {blog.likes} likes <button onClick={addLike}>like</button>
          </p>
          <p>Added by {blog.user.username}</p>
          {isRemovable ? <button onClick={remove}>remove</button> : null}
        </>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(null, {
  setNotification,
  removeBlog,
  addLikeToBlog
})(Blog);
