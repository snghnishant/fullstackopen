import { React, useState } from "react";
import "./App.css";

const ListItem = ({ name }) => {
	return <li>{name}</li>;
};

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	//Event handlers
	const handleNameChange = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const addName = (event) => {
		event.preventDefault();

		const recordObject = {
			name: newName,
		};
		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} already present. Can't Add!`);
		} else {
			setPersons(persons.concat(recordObject));
			setNewName("");
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					Name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit" onClick={addName}>
						Add Contact
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>Debug: {newName}</div>
			<ul>
				{persons.map((person, index) => (
					<ListItem key={index} key name={person.name} />
				))}
			</ul>
		</div>
	);
};

export default App;
