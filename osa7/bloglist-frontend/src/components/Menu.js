import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";
import { Menu, Button } from "semantic-ui-react";

const NavigationMenu = ({ user, logoutUser }) => {
  const [activeButton, setActiveButton] = useState("Blogs");

  const logout = () => {
    logoutUser();
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleClick = (event, { name }) => {
    setActiveButton(name);
  };

  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name="Blogs"
          active={activeButton === "Blogs"}
          as={Link}
          to="/"
          onClick={handleClick}
        >
          Blogs
        </Menu.Item>
        <Menu.Item
          name="Users"
          active={activeButton === "Users"}
          as={Link}
          to="/users"
          onClick={handleClick}
        >
          Users
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="LoggedUser" active={false}>
            {user.name} logged in
          </Menu.Item>
          <Menu.Item>
            <Button active={activeButton === "Logout"} onClick={logout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logoutUser })(NavigationMenu);
