import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { omit } from "lodash";
import {
  Segment,
  Button,
  Divider,
  Header,
  Icon,
  Table,
  Label,
  Form,
  List
} from "semantic-ui-react";

import { useField } from "../hooks/index";
import { setNotification } from "../reducers/notificationReducer";
import {
  removeBlog,
  addLikeToBlog,
  addCommentToBlog
} from "../reducers/blogReducer";

const BlogDetails = ({
  blog,
  user,
  setNotification,
  removeBlog,
  addLikeToBlog,
  addCommentToBlog,
  history
}) => {
  const comment = useField("text");

  if (!user || !blog) {
    return null;
  }

  const isRemovable = blog.user.username === user.username;

  const addLike = async () => {
    try {
      await addLikeToBlog(blog);
    } catch (error) {
      console.error(error);
      setNotification(`Could not add like to blog ${blog.title}`, "error");
    }
  };

  const addComment = async () => {
    try {
      await addCommentToBlog(blog, comment.value);
      comment.reset();
    } catch (error) {
      console.error(error);
      setNotification(`Could not add comment to blog ${blog.title}`, "error");
    }
  };

  const remove = async () => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) {
      return;
    }

    try {
      await removeBlog(blog);
      history.push("/");
    } catch (error) {
      console.error(error);
      setNotification("Could not remove blog", "error");
    }
  };

  return blog ? (
    <Segment>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="tag" />
          Blog Details
        </Header>
      </Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>Title</Table.Cell>
            <Table.Cell>{blog.title}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Likes</Table.Cell>
            <Table.Cell>
              <Button color="red" size="mini" onClick={addLike}>
                <Icon name="heart" />
                Like
              </Button>
              <Label basic color="red" pointing="left">
                {blog.likes}
              </Label>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Url</Table.Cell>
            <Table.Cell>{blog.url}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Added by</Table.Cell>
            <Table.Cell>{blog.user.username}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Header as="h3" dividing>
        Comments
      </Header>

      <List relaxed>
        {blog.comments.map(comment => (
          <List.Item key={comment.id}>
            <List.Content>{comment.text}</List.Content>
          </List.Item>
        ))}
        <Form reply>
          <Form.TextArea
            placeholder="Comment blog"
            {...omit(comment, "reset")}
          />
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
            onClick={addComment}
          />
          {isRemovable ? (
            <Button floated="right" onClick={remove}>
              remove blog
            </Button>
          ) : null}
        </Form>
      </List>
    </Segment>
  ) : null;
};

const mapStateToProps = state => ({
  user: state.user
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    setNotification,
    removeBlog,
    addLikeToBlog,
    addCommentToBlog
  })
)(BlogDetails);
