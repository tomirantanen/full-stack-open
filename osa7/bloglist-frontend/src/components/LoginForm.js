import React from "react";
import PropTypes from "prop-types";
import { omit } from "lodash";

const LoginForm = ({ username, password, handleLogin }) => (
  <>
    <h1>Login to application</h1>
    <form onSubmit={handleLogin}>
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

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
