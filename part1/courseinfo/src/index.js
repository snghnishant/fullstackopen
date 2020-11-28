import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) =>{
return <h1>{props.courseName}</h1>;
}

const Part = (props) =>{
  console.log(`${props.name} ${props.exCount}`);
  return <p>{props.name} {props.exCount}</p>;
}

const Content = (props) =>{
  return (<div>
    <Part name = {props.parts[0].name} exCount = {props.parts[0].exercises}/>
    <Part name = {props.parts[1].name} exCount = {props.parts[1].exercises}/>
    <Part name = {props.parts[2].name} exCount = {props.parts[2].exercises}/>
  </div>);
}

const Total = (props) =>{
  return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
  </p>;
}

const App = () =>{
  const course ={
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  } 

  return(<div>
  <Header courseName = {course.name}/>
  <Content parts = {course.parts}/>
  <Total parts = {course.parts}/>
  </div>);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);