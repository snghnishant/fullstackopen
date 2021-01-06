const express = require("express");

const app = express();

app.use(express.json());

// persons object
let persons = [
	{
		name: "Arto Hellas",
		number: "9876543210",
		id: 1,
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: 2,
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: 3,
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: 4,
	},
];

// default route
app.get("/", (req, res) => {
	res.send(`<h1>Phone Book</h1>`);
});

// info route
app.get("/info", (req, res) => {
	const date = new Date();
	const total = persons.length;
	res.send(`<p>Phonebook has info for ${total} people</p>
        <p>${date}</p>
    `);
});

// get all
app.get("/api/persons", (req, res) => {
	res.json(persons);
});

// get single
app.get("/api/persons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const person = persons.find((el) => el.id === id);
	if (person) {
		res.json(person);
	} else {
		res.status(400).end();
	}
});

// post data

// delete single
app.delete("/api/persons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const personExists = persons.find((el) => el.id === id);
	if (personExists) {
		persons = persons.filter((el) => el.id !== id);
		res.status(204).end();
	} else {
		res.status(400).end();
	}
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`App running at http://localhost:${PORT}`);
});
