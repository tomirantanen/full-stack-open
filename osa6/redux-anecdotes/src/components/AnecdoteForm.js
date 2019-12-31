import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    props.createAnecdote(anecdote);
    props.setNotification(`You created anecdote '${anecdote}'`);
    setTimeout(() => {
      props.setNotification(null);
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

export default connect(null, {
  createAnecdote,
  setNotification
})(AnecdoteForm);
