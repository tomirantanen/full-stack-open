import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ store }) => {
  const { filter, anecdotes } = store.getState();
  const visibleAnecdotes =
    filter !== null
      ? anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes;

  const vote = anecdote => {
    store.dispatch(voteAnecdote(anecdote.id));
    store.dispatch(setNotification(`You voted '${anecdote.content}'`));
    setTimeout(() => {
      store.dispatch(setNotification(null));
    }, 5000);
  };

  return (
    <>
      {visibleAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
