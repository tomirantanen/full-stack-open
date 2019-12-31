const filterReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data.filter;
    default:
      return state;
  }
};

export const setFilter = filter => ({
  type: "SET_FILTER",
  data: { filter }
});

export default filterReducer;
