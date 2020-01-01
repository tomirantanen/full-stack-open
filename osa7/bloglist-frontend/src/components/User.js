import React from "react";
import { List, Segment, Header } from "semantic-ui-react";

const User = ({ user }) =>
  user ? (
    <>
      <Segment>
        <Header as="h2">{user.username}</Header>
        <Header as="h3">Added blogs</Header>
        <List>
          {user.blogs.map(blog => (
            <List.Item key={blog.id}>{blog.title}</List.Item>
          ))}
        </List>
      </Segment>
    </>
  ) : null;

export default User;
