import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginForm from "./LoginForm";
import BlogList from "./BlogList";
import UserList from "./UserList";
import User from "./User";
import NavigationMenu from "./Menu";
import BlogDetails from "./BlogDetails";
import Notification from "./Notification";

const Body = ({ user, users, blogs }) => {
  const userById = id => (users ? users.find(user => user.id === id) : null);
  const blogById = id => (blogs ? blogs.find(blog => blog.id === id) : null);

  return !user ? (
    <LoginForm />
  ) : (
    <>
      <Router>
        <NavigationMenu />
        <Notification />
        <Route exact path="/" render={() => <BlogList user={user} />} />
        <Route exact path="/users" render={() => <UserList />} />
        <Route
          path="/users/:id"
          render={({ match }) => <User user={userById(match.params.id)} />}
        />
        <Route
          path="/blogs/:id"
          render={({ match }) => (
            <BlogDetails blog={blogById(match.params.id)} />
          )}
        />
      </Router>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  blogs: state.blogs
});

export default connect(mapStateToProps)(Body);
