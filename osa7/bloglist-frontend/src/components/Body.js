import React from "react";
import { connect } from "react-redux";

import LoginForm from "./LoginForm";
import BlogList from "./BlogList";

const Body = ({ user }) =>
  !user ? <LoginForm /> : <BlogList user={user}></BlogList>;

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Body);
