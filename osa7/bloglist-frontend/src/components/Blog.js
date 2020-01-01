import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, handleUpdateBlog, handleRemoveBlog, notify, user }) => {
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
    const blogForUpdating = { ...blog, likes: blog.likes + 1 };
    try {
      const updatedBlog = await blogService.update(blogForUpdating);
      handleUpdateBlog(updatedBlog);
    } catch (error) {
      console.error(error);
      notify(`Could not add like to blog ${blog.title}`, "error");
    }
  };

  const removeBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) {
      return;
    }

    try {
      await blogService.remove(blog);
      handleRemoveBlog(blog);
    } catch (error) {
      console.error(error);
      notify("Could not remove blog", "error");
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
          {isRemovable ? <button onClick={removeBlog}>remove</button> : null}
        </>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Blog;
