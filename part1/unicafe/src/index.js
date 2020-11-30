import React from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({good, neutral, bad, total}) =>{
    if(total === 0){
        return <div>
           <h3> No feedback given. </h3>
        </div>
    }
    return(
        <div>
            <h2>Statistics</h2>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
            <p>All {total}</p>
            <p>Average {(good-bad)/(total)}</p>
            <p>Positive {parseInt(good*100)/total}%</p>
        </div>
    );
}

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
            <Statistics good={good} neutral={neutral} bad={bad} total={good+neutral+bad} />
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);