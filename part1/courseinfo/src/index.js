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
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return(<div>
  <Header course = {course}/>
  <Content 
  name1 = {part1} exrCount1 = {exercises1} 
  name2 = {part2} exrCount2 = {exercises2} 
  name3 = {part3} exrCount3 = {exercises3}
  />
  <Total total = {exercises1 + exercises2 + exercises3}/>
  </div>);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);