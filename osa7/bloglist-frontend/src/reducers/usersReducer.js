import usersService from "../services/users";

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = user => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch({
      type: "INIT_USERS",
      data: users
    });
  };
};

export default usersReducer;
