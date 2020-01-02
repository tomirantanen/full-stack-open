import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Header } from "semantic-ui-react";

const UserList = ({ users }) => {
  return users ? (
    <>
      <Header as="h2">Users</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`} data-cy="user-link">
                  {user.username}
                </Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  ) : null;
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(UserList);
