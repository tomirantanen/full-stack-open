import anecdoteService from "../services/anecdotes";

const sortByVotes = (a, b) => b.votes - a.votes;

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VOTE":
      const votedAnecdote = action.data;
      return state
        .map(anecdote =>
          anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
        )
        .sort(sortByVotes);
    case "CREATE_ANECDOTE":
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data.sort(sortByVotes);
    default:
      return state;
  }
};

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch({
      type: "CREATE_ANECDOTE",
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    });
    dispatch({
      type: "ADD_VOTE",
      data: { ...updatedAnecdote }
    });
  };
};

export default anecdoteReducer;
