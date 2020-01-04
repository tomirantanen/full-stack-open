import React, { useState } from "react";

const Login = ({ show, login, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!show) {
    return null;
  }

  const handleLogin = async event => {
    event.preventDefault();

    const result = await login({
      variables: { username, password }
    });

    if (result) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
    setUsername("");
    setPassword("");
    window.location.reload();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            placeholder="Username"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            placeholder="Password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
