import React, { useState, useEffect } from "react";
import Body from "./components/Body";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notification";

function App() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

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
      .then(blogs => setBlogs(blogs))
      .catch(error => {
        console.log(error);
        notify("Could not load blogs", "error");
      });
  }, []);

  /**
   * Display notification message
   * @param {string} message Message to be displayed
   * @param {string} type Type of notification: "info" | "error"
   */
  const notify = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setpassword("");
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };

  const handleCreateBlog = blog => {
    setBlogs(blogs.concat(blog));
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setpassword(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Notification notification={notification} />
        <Body
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
          handleCreateBlog={handleCreateBlog}
          notify={notify}
        ></Body>
      </header>
    </div>
  );
}

export default App;
