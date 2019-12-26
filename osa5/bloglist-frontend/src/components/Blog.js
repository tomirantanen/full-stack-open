import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={blogStyle} onClick={toggleDetails}>
      <p>
        {blog.title} {blog.author}
      </p>
      {showDetails ? (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button>like</button>
          </p>
          <p>Added by {blog.user.username}</p>
        </>
      ) : null}
    </div>
  );
};

export default Blog;
