import React from "react";
const Blog = ({ blog }) => (
  <>
    <p>
      {blog.title} {blog.author}
    </p>
  </>
);

export default Blog;
