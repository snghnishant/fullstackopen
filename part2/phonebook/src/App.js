import { React, useState } from "react";
import "./App.css";
import ListItem from "./Components/listItem";
import ContactForm from "./Components/contactForm";
import SearchForm from "./Components/searchContact";

const App = () => {
	//State Initialization
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", phone: "040-123456" },
		{ name: "Ada Lovelace", phone: "39-44-5323523" },
		{ name: "Dan Abramov", phone: "12-43-234345" },
		{ name: "Mary Poppendieck", phone: "39-23-6423122" },
	]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filterName, setFilterName] = useState("");

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

	//Form submit handler
	const addContact = (event) => {
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

	// Case Insensitive contact filtering
	const matchedContacts =
		filterName !== ""
			? persons.filter((person) =>
					person.name.toLowerCase().includes(filterName.toLowerCase())
			  )
			: [];

	return (
		<div>
			<h2>Phone Book</h2>

			<SearchForm
				filterName={filterName}
				event={handleFilterNameChange}
			/>
			<ul>
				{matchedContacts.map((person, index) => (
					<ListItem
						key={index}
						name={person.name}
						phone={person.phone}
					/>
				))}
			</ul>

			<ContactForm
				value1={newName}
				handler1={handleNameChange}
				value2={newPhone}
				handler2={handlePhoneChange}
				handler3={addContact}
			/>

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
