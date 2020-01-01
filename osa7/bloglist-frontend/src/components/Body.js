import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginForm from "./LoginForm";
import BlogList from "./BlogList";
import UserList from "./UserList";

const Body = ({ user }) =>
  !user ? (
    <LoginForm />
  ) : (
    <>
      <Router>
        <Route exact path="/" render={() => <BlogList user={user} />} />
        <Route path="/users" render={() => <UserList />} />
      </Router>
    </>
  );

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Body);
