import React from "react";
import LoginForm from "./LoginForm";
import BlogList from "./BlogList";

const Body = ({ username, password, handleLogin, user, handleLogout }) =>
  !user ? (
    <LoginForm
      username={username}
      password={password}
      handleLogin={handleLogin}
    ></LoginForm>
  ) : (
    <BlogList user={user} handleLogout={handleLogout}></BlogList>
  );

export default Body;
