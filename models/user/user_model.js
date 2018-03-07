var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'login' : {type: String, required: true, unique: true, lowercase: true},
	'password' : {type: String, required: true},
	'profile' : { type: Schema.Types.Number, ref: 'Profile', required: true }, 
	'acive': { type: Number, default: 1 },
	'name' : {type: String, required: true},
	'email':{type: String, lowercase: true},
	'cell_phone' : {type: String},
	'register' :  {
				'date': Date,
				'user' : { type: Schema.Types.ObjectId, ref: 'User' }},
	'update' : [{
				'date': { type: Date, default: Date.now },
				'user': { type: Schema.Types.ObjectId, ref: 'User' }}]
	
});


module.exports = mongoose.model('User', userSchema);