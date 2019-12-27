import React from "react";
import PropTypes from "prop-types";

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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
