import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.create(anecdote);

    props.createAnecdote(newAnecdote);
    props.setNotification(`You created anecdote '${anecdote}'`);
    setTimeout(() => {
      props.setNotification(null);
    }, 5000);
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
