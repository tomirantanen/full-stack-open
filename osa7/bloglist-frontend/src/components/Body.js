import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginForm from "./LoginForm";
import BlogList from "./BlogList";
import UserList from "./UserList";
import User from "./User";

const Body = ({ user, users }) => {
  const userById = id => (users ? users.find(user => user.id === id) : null);

  return !user ? (
    <LoginForm />
  ) : (
    <>
      <Router>
        <Route exact path="/" render={() => <BlogList user={user} />} />
        <Route exact path="/users" render={() => <UserList />} />
        <Route
          path="/users/:id"
          render={({ match }) => <User user={userById(match.params.id)} />}
        />
      </Router>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  users: state.users
});

export default connect(mapStateToProps)(Body);
