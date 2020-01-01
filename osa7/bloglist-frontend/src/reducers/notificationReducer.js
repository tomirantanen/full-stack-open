const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFCATION":
      return null;
    default:
      return state;
  }
};

/**
 * Display notification message
 * @param {String} message Message to be displayed
 * @param {string} type Type of notification: "info" | "error"
 */
export const setNotification = (message, type) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: { message, type }
    });
    setTimeout(() => dispatch({ type: "CLEAR_NOTIFCATION" }), 5000);
  };
};

export default notificationReducer;
