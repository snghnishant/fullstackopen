import React from 'react';
import ReactDOM from 'react-dom';

const App = () =>{
    // save clicks of each button to its own state
    const [good, setGood] = React.useState(0);
    const [neutral, setNeutral] = React.useState(0);
    const [bad, setBad] = React.useState(0);
    
    return(
        <div>
            Hello World
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);