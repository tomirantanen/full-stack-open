import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Body from "./components/Body";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { useField } from "./hooks/index";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = ({ setNotification, initializeBlogs }) => {
  const username = useField("text");
  const password = useField("password");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await initializeBlogs();
      } catch (error) {
        console.error(error);
        setNotification("Could not load blogs", "error");
      }
    };
    fetchBlogs();
  }, [initializeBlogs, setNotification]);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
    } catch (error) {
      setNotification("Wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <div className="App">
      <header className="App-header">
        <Notification />
        <Body
          username={username}
          password={password}
          handleLogin={handleLogin}
          user={user}
          handleLogout={handleLogout}
        ></Body>
      </header>
    </div>
  );
};

export default connect(null, {
  setNotification,
  initializeBlogs
})(App);
