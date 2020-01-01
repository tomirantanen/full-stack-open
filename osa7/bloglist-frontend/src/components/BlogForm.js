import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { omit } from "lodash";

import blogService from "../services/blogs";
import { useField } from "../hooks/index";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ handleCreateBlog, setNotification }) => {
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

      setNotification(`Blog ${blog.title} created`, "info");
    } catch (error) {
      console.error(error);
      setNotification("Could not create blog", "error");
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
  handleCreateBlog: PropTypes.func.isRequired
};

export default connect(null, { setNotification })(BlogForm);
