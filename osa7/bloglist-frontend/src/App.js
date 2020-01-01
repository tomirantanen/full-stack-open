import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Body from "./components/Body";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { useField } from "./hooks/index";
import { setNotification } from "./reducers/notificationReducer";

const App = ({ setNotification }) => {
  const username = useField("text");
  const password = useField("password");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs.sort(sortByLikes)))
      .catch(error => {
        console.log(error);
        setNotification("Could not load blogs", "error");
      });
  }, [setNotification]);

  const sortByLikes = (a, b) => b.likes - a.likes;

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

  const handleCreateBlog = blog => {
    setBlogs(blogs.concat(blog).sort(sortByLikes));
  };

  const handleUpdateBlog = updatedBlog => {
    setBlogs(
      blogs
        .filter(blog => blog.id !== updatedBlog.id)
        .concat(updatedBlog)
        .sort(sortByLikes)
    );
  };

  const handleRemoveBlog = removedBlog => {
    setBlogs(blogs.filter(blog => blog.id !== removedBlog.id));
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
          blogs={blogs}
          handleLogout={handleLogout}
          handleCreateBlog={handleCreateBlog}
          handleUpdateBlog={handleUpdateBlog}
          handleRemoveBlog={handleRemoveBlog}
        ></Body>
      </header>
    </div>
  );
};

export default connect(null, { setNotification })(App);
