import React from "react";
import LoginForm from "./LoginForm";
import BlogList from "./BlogList";

const Body = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  user,
  blogs,
  handleLogout,
  handleCreateBlog,
  notify
}) =>
  !Boolean(user) ? (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleLogin={handleLogin}
    ></LoginForm>
  ) : (
    <BlogList
      user={user}
      blogs={blogs}
      handleLogout={handleLogout}
      handleCreateBlog={handleCreateBlog}
      notify={notify}
    ></BlogList>
  );

export default Body;
