const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;
    default:
      return state;
  }
};

/**
 *
 * @param {String} notification Message to be displayed
 * @param {Number} timeout Notification timeout in seconds
 */
export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: { notification }
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        data: { notification: null }
      });
    }, timeout * 1000);
  };
};

export default notificationReducer;
