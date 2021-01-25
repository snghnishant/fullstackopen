const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const personSchema = new mongoose.Schema({
	name: { type: String, minlength: 3, required: true, unique: true },
	phone: { type: String, minlength: 8, required: true, unique: true },
});

personSchema.plugin(uniqueValidator);

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
