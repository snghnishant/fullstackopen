const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
// app.use(morgan('tiny'));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body"
	)
);

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
// app.get("/", (req, res) => {
// 	res.send(`<h1>Phone Book</h1>`);
// });

// info route
app.get("/api", (req, res) => {
	const date = new Date();
	const total = persons.length;
	res.send(`<p>Phonebook has info for ${total} people</p>
		<p>${date}</p> <br>
		<h3>API Routes </h3>
		<p>GET ALL: /api/persons</p>
		<p>GET Single: /api/persons/id</p>
		<p>POST: /api/persons/</p>
		<p>DELETE: /api/persons/id</p>
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

// generate random id
const generateId = () => {
	const randomID = Math.floor(Math.random() * 69420);
	return randomID;
};

// post data
app.post("/api/persons", (req, res) => {
	const body = req.body;
	if (!body.name || !body.number) {
		return res.status(400).json({ error: "Content Missing" });
	}

	if (persons.find((p) => p.name === body.name)) {
		return res
			.status(400)
			.json({ error: "Name already exists, it should be unique" });
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	res.json(person);
});

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`App running at ${PORT}`);
});
