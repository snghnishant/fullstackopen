import { React, useState, useEffect } from "react";
import "./App.css";
import ListItem from "./Components/listItem";
import ContactForm from "./Components/contactForm";
import SearchForm from "./Components/searchContact";
import {
	getAll,
	addNew,
	deleteContact,
	updateContact,
} from "./Services/persons";

const App = () => {
	//State Initialization
	const [persons, setPersons] = useState([]);
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
			id: persons.length + 1,
			name: newName,
			number: newPhone,
		};

		if (persons.find((person) => person.name === newName)) {
			const updateAction = window.confirm(
				`${newName} is already added to phonebook, do you want to update the number?`
			);

			if (updateAction) {
				const index = persons.findIndex(
					(person) => person.name === newName
				);

				const updatedData = { ...persons[index], number: newPhone };

				updateContact(updatedData).then(() => {
					setNewName("");
					setNewPhone("");
					getAll().then((newData) => setPersons(newData));
				});
			}
		} else if (persons.find((person) => person.number === newPhone)) {
			alert(`${newPhone} already present. Can't Add!`);
		} else {
			addNew(recordObject).then((returnedData) => {
				console.log(returnedData);
				setPersons(persons.concat(returnedData));
				setNewName("");
				setNewPhone("");
			});
		}
	};

	// delete contact handler
	const handleDelete = (id, name) => {
		const res = window.confirm(`Delete Contact ${name}`);
		if (res) {
			deleteContact(id).then(() => {
				getAll().then((newData) => setPersons(newData));
			});
		}
	};

	// Case Insensitive contact filtering
	const matchedContacts =
		filterName !== ""
			? persons.filter((person) =>
					person.name.toLowerCase().includes(filterName.toLowerCase())
			  )
			: [];

	//Initial fetching of data from the json-server
	const fetchInitData = () => {
		getAll().then((initialData) => setPersons(initialData));
	};

	//Fetching and data initialization
	useEffect(fetchInitData, []);

	return (
		<div>
			<h2>Phone Book</h2>
			<SearchForm
				filterName={filterName}
				event={handleFilterNameChange}
			/>
			<ul>
				{matchedContacts.map((person) => (
					<ListItem
						key={person.id}
						name={person.name}
						phone={person.number}
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
				{persons.map((person) => (
					<li key={person.id}>
						{person.name} {person.number}
						<button
							onClick={() => {
								handleDelete(person.id, person.name);
							}}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
