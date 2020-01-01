import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

import Body from "./components/Body";
import blogService from "./services/blogs";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setLoggedInUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = ({
  setNotification,
  initializeBlogs,
  setLoggedInUser,
  initializeUsers
}) => {
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

  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  return (
    <Container>
      <header className="App-header">
        <Body />
      </header>
    </Container>
  );
};

export default connect(null, {
  setNotification,
  initializeBlogs,
  setLoggedInUser,
  initializeUsers
})(App);
