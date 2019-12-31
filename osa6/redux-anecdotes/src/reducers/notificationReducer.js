const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;
    default:
      return state;
  }
};

export const setNotification = notification => ({
  type: "SET_NOTIFICATION",
  data: { notification }
});

export default notificationReducer;
