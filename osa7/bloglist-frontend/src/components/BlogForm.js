import React from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { useField } from "../hooks/index";
import { omit } from "lodash";

const BlogForm = ({ handleCreateBlog, notify }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleFormSubmit = async event => {
    event.preventDefault();
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    };
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
          <input name="Title" {...omit(title, "reset")} />
        </div>
        <div>
          author:
          <input name="Author" {...omit(author, "reset")} />
        </div>
        <div>
          url:
          <input name="Url" {...omit(url, "reset")} />
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
