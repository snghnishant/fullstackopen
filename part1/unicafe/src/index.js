import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, increment}) =>{
    return <button onClick={increment}>{text}</button>
}
const Statistic = ({text, value}) =>{
    return (<tr>
        <td>{text}</td> 
        <td>{value}</td>
        </tr>);
}
const Statistics = ({good, neutral, bad, total}) =>{
    if(total === 0){
        return <div>
           <h3> No feedback given. </h3>
        </div>
    }
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Statistics</th>
                    </tr>
                </thead>
                <tbody>
                    <Statistic text = "Good" value={good}/>
                    <Statistic text = "Neutral" value={neutral}/>
                    <Statistic text = "Bad" value={bad}/>
                    <Statistic text = "Total" value={total}/>
                    <Statistic text = "Average" value={((good-bad)/ (total)).toFixed(1)}/>
                    <Statistic text = "Positive" value={parseInt(   (good*100)/total).toFixed(1)}/>
                </tbody>
                <tfoot></tfoot> 
            </table>         
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
            <Button text="Good" increment={incGood}/>
            <Button text="Neutral" increment={incNeutral}/>
            <Button text="Bad" increment={incBad}/>
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