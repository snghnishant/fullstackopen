import { React, useState } from "react";
import "./App.css";

const ListItem = ({ name, phone }) => {
	return (
		<li>
			{name} : {phone}
		</li>
	);
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "NAME", phone: "PHONE NUMBER" },
	]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");

	//Event handlers
	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handlePhoneChange = (event) => {
		setNewPhone(event.target.value);
	};

	const addName = (event) => {
		event.preventDefault();

		const recordObject = {
			name: newName,
			phone: newPhone,
		};

		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} already present. Can't Add!`);
		} else if (persons.find((person) => person.phone === newPhone)) {
			alert(`${newPhone} already present. Can't Add!`);
		} else {
			setPersons(persons.concat(recordObject));
			setNewName("");
			setNewPhone("");
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					NAME: <input value={newName} onChange={handleNameChange} />
					PHONE:{" "}
					<input value={newPhone} onChange={handlePhoneChange} />
				</div>
				<div>
					<button type="submit" onClick={addName}>
						Add Contact
					</button>
				</div>
			</form>
			<h2>Contact List</h2>
			<ul>
				{persons.map((person, index) => (
					<ListItem
						key={index}
						key
						name={person.name}
						phone={person.phone}
					/>
				))}
			</ul>
		</div>
	);
};

export default App;
