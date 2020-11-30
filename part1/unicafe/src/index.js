import React from 'react';
import ReactDOM from 'react-dom';


const App = () =>{
    // save clicks of each button to its own state
    const [good, setGood] = React.useState(0);
    const [neutral, setNeutral] = React.useState(0);
    const [bad, setBad] = React.useState(0);

    const incGood = () =>{
        setGood(good+1);
    }

    const incNeutral = () =>{
        setNeutral(neutral+1);
    }
    const incBad = () =>{
        setBad(bad+1);
    }

    return(
        <div>
            <h1>Give Feedback</h1>
            <button onClick={incGood}>Good</button>
            <button onClick={incNeutral}>Neutral</button>
            <button onClick={incBad}>Bad</button>
            <h2>Statistics</h2>
    <p>Good {good}</p>
    <p>Neutral {neutral}</p>
    <p>Bad {bad}</p>
    <p>All {good+neutral+bad}</p>
    <p>Average {(good-bad)/(good+neutral+bad)}</p>
    <p>Positive {parseInt(good*100)/(good+neutral+bad)}%</p>
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);