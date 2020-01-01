const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.data;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export const setLoggedInUser = user => {
  return async dispatch => {
    dispatch({
      type: "LOGIN_USER",
      data: user
    });
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: "LOGOUT_USER"
    });
  };
};

export default userReducer;
