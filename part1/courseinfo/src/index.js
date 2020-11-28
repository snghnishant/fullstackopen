import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) =>{
return <h1>{props.course}</h1>;
}

const Part = (props) =>{
  console.log(`${props.name} ${props.exCount}`);
  return <p>{props.name} {props.exCount}</p>;
}

const Content = (props) =>{
  return (<div>
    <Part name = {props.name1} exCount = {props.exrCount1}/>
    <Part name = {props.name2} exCount = {props.exrCount2}/>
    <Part name = {props.name3} exCount = {props.exrCount3}/>
  </div>);
}

const Total = (props) =>{
  return <p>Number of exercises {props.total}</p>;
}

const App = () =>{
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return(<div>
  <Header course = {course}/>
  <Content 
  name1 = {part1.name} exrCount1 = {part1.exercises} 
  name2 = {part2.name} exrCount2 = {part2.exercises} 
  name3 = {part3.name} exrCount3 = {part3.exercises}
  />
  <Total total = {part1.exercises + part2.exercises + part3.exercises}/>
  </div>);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);