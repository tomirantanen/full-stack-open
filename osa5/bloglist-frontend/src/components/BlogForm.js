import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const BlogForm = ({ handleCreateBlog, notify }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = event => setTitle(event.target.value);
  const handleAuthorChange = event => setAuthor(event.target.value);
  const handleUrlChange = event => setUrl(event.target.value);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const blog = { title, author, url };
    try {
      const createdBlog = await blogService.create(blog);
      handleCreateBlog(createdBlog);
      notify(`Blog ${blog.title} created`, "info");
    } catch (error) {
      console.error(error);
      notify("Could not create blog", "error");
    }
  };

  return (
    <>
      <h1>Create new</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="Url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
};

export default BlogForm;
