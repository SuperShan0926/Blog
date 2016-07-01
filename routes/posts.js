var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PostSchema = new Schema({
	name : String,
	title : String,
	post : String,
	time : {
		month : String,
		day : String,
		minute : String
	}


});


module.exports = mongoose.model('post', PostSchema);