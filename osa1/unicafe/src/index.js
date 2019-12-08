import React, { useState } from "react";
import ReactDOM from "react-dom";

// Values of different types of feedback
const GOOD_VALUE = 1;
const NEUTRAL_VALUE = 0;
const BAD_VALUE = -1;

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = props => {
  const { good, neutral, bad } = props.feedback;

  const getTotal = () => good + neutral + bad;
  const getAverage = () =>
    (good * GOOD_VALUE + neutral * NEUTRAL_VALUE + bad * BAD_VALUE) /
    getTotal();
  const getPositivePercentage = () =>
    ((good / getTotal()) * 100).toString().concat(" %");

  return getTotal() !== 0 ? (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={getTotal()} />
        <Statistic text="average" value={getAverage()} />
        <Statistic text="positive" value={getPositivePercentage()} />
      </tbody>
    </table>
  ) : (
    <p>No feedback given</p>
  );
};

const Button = ({ text, clickHandler }) => (
  <button onClick={() => clickHandler()}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = {
    good,
    neutral,
    bad
  };

  const goodPressed = () => setGood(good + 1);
  const neutralPressed = () => setNeutral(neutral + 1);
  const badPressed = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" clickHandler={goodPressed} />
      <Button text="neutral" clickHandler={neutralPressed} />
      <Button text="good" clickHandler={badPressed} />
      <h1>statistics</h1>
      <Statistics feedback={feedback} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
