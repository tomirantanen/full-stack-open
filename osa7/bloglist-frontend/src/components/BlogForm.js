import React from "react";
import { connect } from "react-redux";
import { omit } from "lodash";
import { Header, Form, Button } from "semantic-ui-react";

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
      <Header as="h2">Create blog</Header>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <label>Title</label>
          <input placeholder="Title" {...omit(title, "reset")} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input placeholder="Author" {...omit(author, "reset")} />
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <input placeholder="Url" {...omit(url, "reset")} />
        </Form.Field>
        <Button size="tiny" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
};

export default connect(null, {
  setNotification,
  createBlog
})(BlogForm);
