import React from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const voteArray = new Array(anecdotes.length).fill(0);

const Buttons = ({getRandom, voteUp}) =>{
  return (<div>
    <button onClick={voteUp}>Vote</button>
    <button onClick={getRandom}>Next Anecdote</button>
  </div>);
}
const App = (props) => {
  const [selected, setSelected] = React.useState(0);
  const [votes, setVotes] = React.useState(voteArray);
  const [currentIndex, setIndex] = React.useState(0);

  const getRandom = () =>{
    let randomNumber = Math.floor(Math.random()* Math.floor(anecdotes.length));
    console.log(randomNumber);
    setSelected(randomNumber);
    setIndex(randomNumber);
  }

  const voteUp = () =>{
    const newVotes = [...votes];
    newVotes[currentIndex]+=1;
    console.log(currentIndex, newVotes);
    setVotes(newVotes);
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[currentIndex]} votes</p>
      </div> 
      <Buttons getRandom={getRandom} voteUp={voteUp}/>
    </div>
  )
}




ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} votes={voteArray}/>
  </React.StrictMode>,
  document.getElementById('root')
);

