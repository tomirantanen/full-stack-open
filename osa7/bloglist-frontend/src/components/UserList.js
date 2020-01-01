import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const UserList = ({ users }) => {
  return users ? (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : null;
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(UserList);
