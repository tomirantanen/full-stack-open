import React from "react";

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin
}) => (
  <>
    <h1>Login to application</h1>
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          name="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          name="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  </>
);

export default LoginForm;
