import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const Menu = ({ user, logoutUser }) => {
  const logout = () => {
    logoutUser();
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <div>
      <p>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logoutUser })(Menu);
