var mongoose= require("mongoose");

var paragraphSchema= new mongoose.Schema({
	content: String,
	test: Number
});

module.exports = mongoose.model("paragraph", paragraphSchema);
