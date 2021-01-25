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

// Get  info
app.get("/info", (req, res) => {
	Person.estimatedDocumentCount({}, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			const totalEntries = result;
			const date = new Date();
			res.send(`<p>Current time: ${date}</p>
		<strong>Database has records of ${totalEntries} person</strong>`);
		}
	});
});

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

// Update data
app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body;
	const person = {
		name: body.name,
		phone: body.number,
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then((updatedData) => {
			res.json(updatedData);
		})
		.catch((error) => {
			next(error);
		});
});

// Delete single person
app.delete("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	Person.findByIdAndRemove(id)
		.then((result) => {
			res.status(204).send(result);
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
	} else if (error.name === "ValidationError") {
		return res.status(400).send({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`App running at ${PORT}`);
});
