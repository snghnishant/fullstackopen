import React from "react";

const Header = (props) => {
	return <h1>{props.courseName}</h1>;
};

const Part = (props) => {
	console.log(`${props.name} ${props.exCount}`);
	return (
		<p>
			{props.name} {props.exCount}
		</p>
	);
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part, index) => (
				<Part key={index} name={part.name} exCount={part.exercises} />
			))}
		</div>
	);
};

// const Total = ({ parts }) => {
// 	const total = 0;
// 	return <p>Number of exercises {total}</p>;
// };

const Course = ({ course }) => {
	return (
		<div>
			<Header courseName={course.name} />
			<Content parts={course.parts} />
			{/* <Total parts={course.parts} /> */}
		</div>
	);
};

export default Course;
