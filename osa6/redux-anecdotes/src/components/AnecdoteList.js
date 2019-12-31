import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteList = props => {
  const vote = anecdote => {
    props.voteAnecdote(anecdote);
    props.setNotification(`You voted '${anecdote.content}'`, 5);
  };

  return (
    <>
      {props.visibleAnecdotes.map(anecdote => (
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

const getVisibleAnecdotes = ({ anecdotes, filter }) =>
  filter !== null
    ? anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    : anecdotes;

const mapStateToProps = state => {
  return {
    visibleAnecdotes: getVisibleAnecdotes(state)
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
