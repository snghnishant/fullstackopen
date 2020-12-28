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
		{ name: "Arto Hellas", phone: "040-123456" },
		{ name: "Ada Lovelace", phone: "39-44-5323523" },
		{ name: "Dan Abramov", phone: "12-43-234345" },
		{ name: "Mary Poppendieck", phone: "39-23-6423122" },
	]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filterName, setFilterName] = useState(null);

	//Event handlers
	const handleFilterNameChange = (event) => {
		setFilterName(event.target.value);
	};

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

	const matchedContacts = filterName
		? persons.filter((person) =>
				person.name.toLowerCase().includes(filterName.toLowerCase())
		  )
		: [];

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				Search Contacts:{" "}
				<input value={filterName} onChange={handleFilterNameChange} />
			</div>
			<ul>
				{matchedContacts.map((person, index) => (
					<ListItem
						key={index}
						name={person.name}
						phone={person.phone}
					/>
				))}
			</ul>
			<form>
				<div>
					NAME: <input value={newName} onChange={handleNameChange} />{" "}
					<br />
					PHONE:{" "}
					<input value={newPhone} onChange={handlePhoneChange} />{" "}
					<br />
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
						name={person.name}
						phone={person.phone}
					/>
				))}
			</ul>
		</div>
	);
};

export default App;
