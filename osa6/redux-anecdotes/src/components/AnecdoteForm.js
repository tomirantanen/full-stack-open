import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ store }) => {
  const addAnecdote = event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    store.dispatch(createAnecdote(anecdote));
    store.dispatch(setNotification(`You created anecdote '${anecdote}'`));
    setTimeout(() => {
      store.dispatch(setNotification(null));
    }, 5000);
    event.target.anecdote.value = "";
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
