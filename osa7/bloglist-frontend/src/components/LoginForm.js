import React from "react";
import { connect } from "react-redux";
import { omit } from "lodash";
import { Form, Button, Header } from "semantic-ui-react";

import { useField } from "../hooks/index";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setLoggedInUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = ({ setLoggedInUser, setNotification }) => {
  const username = useField("text");
  const password = useField("password");

  const login = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setLoggedInUser(user);
    } catch (error) {
      setNotification("Wrong credentials", "error");
    }
  };

  return (
    <>
      <Header as="h1">Login to application</Header>
      <Form onSubmit={login}>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="Username"
            name="Username"
            {...omit(username, "reset")}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            name="Password"
            {...omit(password, "reset")}
          />
        </Form.Field>
        <Button size="tiny" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default connect(null, {
  setLoggedInUser,
  setNotification
})(LoginForm);
