require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(morgan("tiny"));

console.log("Connecting to Database...");

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

console.log("Connection Successful!");

// Get all persons
app.get("/api/persons", (req, res) => {
	Person.find({}).then((persons) => {
		res.json(persons);
	});
});

// Get single person
app.get("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	Person.findById(id)
		.then((person) => {
			if (person) res.json(person);
			else res.status(404).end();
		})
		.catch((error) => {
			// console.log(error);
			// res.status(400).send({ error: "Malformatted ID" });
			next(error);
		});
});

// Save new data
app.post("/api/persons", (req, res, next) => {
	const body = req.body;
	// if (!body.name || !body.number) {
	// 	return res.status(400).json({ error: "Content Missing" });
	// }

	const person = new Person({
		name: body.name,
		phone: body.number,
	});

	person
		.save()
		.then((savedData) => res.json(savedData))
		.catch((error) => {
			// console.log(error);
			// res.status(500).send({ error: "Server Error" });
			next(error);
		});
});

// Delete single person
app.delete("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	Person.findByIdAndRemove(id)
		.then((result) => {
			res.status(204).end();
		})
		.catch((error) => {
			// console.log(error);
			// res.status(400).send({ error: "Malformatted ID" });
			next(error);
		});
});

// Error handling middleware

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "Unknown Endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return res.status(400).send({ error: "Malformatted ID" });
	}
	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`App running at ${PORT}`);
});
