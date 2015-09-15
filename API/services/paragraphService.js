var paragraph= require('.././models/paragraph');

module.exports = {
	//get all paragraphs 
	getAllParagraphs: function () {

		return paragraph.find({});
	},
	
	//get a pragraph by ID
	getParagraphById: function(id){
		return paragraph.findById(id);
	}
}