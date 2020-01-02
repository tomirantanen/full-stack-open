import React from "react";
import { connect } from "react-redux";
import { Table, Header, Segment } from "semantic-ui-react";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = ({ user, blogs }) => {
  return (
    <>
      <Togglable buttonLabel="Create blog">
        <BlogForm />
      </Togglable>

      <Segment basic>
        <Header as="h2">Blogs</Header>
        <Table data-cy="blogs-table">
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} user={user}></Blog>
          ))}
        </Table>
      </Segment>
    </>
  );
};

const mapStateToProps = state => ({
  blogs: state.blogs
});

export default connect(mapStateToProps)(BlogList);
