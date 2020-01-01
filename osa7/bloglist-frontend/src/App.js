import React, { useEffect } from "react";
import { connect } from "react-redux";

import Body from "./components/Body";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setLoggedInUser } from "./reducers/userReducer";

const App = ({ setNotification, initializeBlogs, setLoggedInUser }) => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedInUser(user);
      blogService.setToken(user.token);
    }
  }, [setLoggedInUser]);

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

  return (
    <div className="App">
      <header className="App-header">
        <Notification />
        <Body />
      </header>
    </div>
  );
};

export default connect(null, {
  setNotification,
  initializeBlogs,
  setLoggedInUser
})(App);
