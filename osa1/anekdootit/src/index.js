import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, clickHandler }) => (
  <button onClick={() => clickHandler()}>{text}</button>
);

const Anecdote = ({ anecdote, votes }) => (
  <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
);

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const setRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  const voteAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };
  const mostPopular = () => votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" clickHandler={voteAnecdote} />
      <Button text="next anecdote" clickHandler={setRandomAnecdote} />
      <h1>Anecdote with most votes</h1>
      <Anecdote
        anecdote={props.anecdotes[mostPopular()]}
        votes={votes[mostPopular()]}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
