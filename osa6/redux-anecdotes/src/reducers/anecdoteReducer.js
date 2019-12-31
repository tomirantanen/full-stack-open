const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VOTE":
      const id = action.data.id;
      const anecdoteForVoting = state.find(anecdote => anecdote.id === id);
      const votedAnecdote = {
        ...anecdoteForVoting,
        votes: anecdoteForVoting.votes + 1
      };
      return state
        .map(anecdote => (anecdote.id !== id ? anecdote : votedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    case "CREATE_ANECDOTE":
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = anecdote => ({
  type: "CREATE_ANECDOTE",
  data: anecdote
});

export const initializeAnecdotes = anecdotes => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  };
};

export const voteAnecdote = id => ({
  type: "ADD_VOTE",
  data: { id }
});

export default anecdoteReducer;
