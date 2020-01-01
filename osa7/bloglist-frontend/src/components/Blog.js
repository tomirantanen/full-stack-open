import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";

import { setNotification } from "../reducers/notificationReducer";
import { removeBlog, addLikeToBlog } from "../reducers/blogReducer";

const Blog = ({ blog, history }) => {
  const openDetails = () => history.push(`/blogs/${blog.id}`);

  return (
    <Table.Body>
      <Table.Row key={blog.id} onClick={openDetails}>
        <Table.Cell>
          {blog.title} {blog.author}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  connect(null, {
    setNotification,
    removeBlog,
    addLikeToBlog
  })
)(Blog);
