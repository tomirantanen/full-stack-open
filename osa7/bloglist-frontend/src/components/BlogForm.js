import React from "react";
import { connect } from "react-redux";
import { omit } from "lodash";

import { useField } from "../hooks/index";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ setNotification, createBlog }) => {
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
      await createBlog(blog);
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

export default connect(null, {
  setNotification,
  createBlog
})(BlogForm);
