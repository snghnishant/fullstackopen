//require("dotenv").config();
const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("Few arguments, exiting!");
	return;
}

const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@cluster0.od9cn.mongodb.net/fullstackopen?retryWrites=true&w=majority`;

console.log("Connecting to MongoDB database");

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
	name: String,
	phone: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		phone: process.argv[4],
	});

	person.save().then((result) => {
		console.log(`Added ${result.name} number ${result.phone} to Phonebook`);
		mongoose.connection.close();
	});
} else {
	console.log("phonebook:");
	Person.find({}).then((result) => {
		result.forEach((p) => console.log(p.name, p.phone));
		mongoose.connection.close();
	});
}
