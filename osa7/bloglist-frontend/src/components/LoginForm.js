import React from "react";
import { connect } from "react-redux";
import { omit } from "lodash";

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
      <h1>Login to application</h1>
      <form onSubmit={login}>
        <div>
          username:
          <input name="Username" {...omit(username, "reset")} />
        </div>
        <div>
          password:
          <input name="Password" {...omit(password, "reset")} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </>
  );
};

export default connect(null, {
  setLoggedInUser,
  setNotification
})(LoginForm);
