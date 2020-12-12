import React from 'react';
import ReactDOM from 'react-dom';

// anecdotes array accessible globally
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

// voteArray with initial values set to 0
const voteArray = new Array(anecdotes.length).fill(0);

// Button components
const Buttons = ({getRandom, voteUp}) =>{
  return (<div>
    <button onClick={voteUp}>Vote</button>
    <button onClick={getRandom}>Next Anecdote</button>
  </div>);
}

// MostVoted component with conditional rendering to only show mostVoted quote when available
const MostVoted = ({mostVotes, votes}) =>{
  if(mostVotes === null)
    return null;
  
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <h4>{anecdotes[mostVotes]}</h4>
      <h5>has {votes[mostVotes]} votes</h5>
    </div>
  )
}

// App component
const App = (props) => {
  const [selected, setSelected] = React.useState(0);
  const [votes, setVotes] = React.useState(voteArray);
  const [currentIndex, setIndex] = React.useState(0); // to store index state 
  const [mostVotes, setMostVoted] = React.useState(null);

    // random quote picker event handler function
  const getRandom = () =>{
    const randomNumber = Math.floor(Math.random()* Math.floor(anecdotes.length));
    console.log(randomNumber);
    setSelected(randomNumber);
    setIndex(randomNumber); //changing index state to the randomNumber index generated from above
    
  }

  // vote up event handler
  const voteUp = () =>{
    const newVotes = [...votes];
    newVotes[currentIndex]+=1;
    console.log(currentIndex, newVotes);
    setVotes(newVotes);
    const mostVotedIndex = newVotes.indexOf(Math.max(...newVotes));
    console.log(mostVotedIndex);
    setMostVoted(mostVotedIndex);
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <h4>{props.anecdotes[selected]}</h4>
        <h5>has {votes[currentIndex]} votes</h5>
      </div> 
      <Buttons getRandom={getRandom} voteUp={voteUp}/>
      <MostVoted mostVotes={mostVotes} votes={votes}/>
    </div>
  )
}




ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} votes={voteArray}/>
  </React.StrictMode>,
  document.getElementById('root')
);

