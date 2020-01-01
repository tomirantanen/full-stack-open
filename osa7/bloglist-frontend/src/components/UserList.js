import React, { useEffect } from "react";
import { connect } from "react-redux";

import { initializeUsers } from "../reducers/usersReducer";

const UserList = ({ users, initializeUsers }) => {
  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

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
              <td>{user.username}</td>
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

export default connect(mapStateToProps, { initializeUsers })(UserList);
