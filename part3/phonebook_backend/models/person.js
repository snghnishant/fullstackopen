const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
	name: String,
	phone: String,
});

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.number = returnedObject.phone;
		returnedObject.id = returnedObject._id.toString();

		delete returnedObject.phone;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", personSchema);
