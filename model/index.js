const mongoose = require('mongoose');

const schemeser = new mongoose.Schema({
	username:String,
	password:String,
	realname:String,
	phone:String,
	status:String,
	email:String
})

mongoose.model('user',schemeser);

