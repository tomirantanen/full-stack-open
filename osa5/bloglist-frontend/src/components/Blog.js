import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleUpdateBlog, notify }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

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

  return (
    <div style={blogStyle}>
      <p className="blog-title" onClick={toggleDetails}>
        {blog.title} {blog.author}
      </p>
      {showDetails ? (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button onClick={addLike}>like</button>
          </p>
          <p>Added by {blog.user.username}</p>
        </>
      ) : null}
    </div>
  );
};

export default Blog;
