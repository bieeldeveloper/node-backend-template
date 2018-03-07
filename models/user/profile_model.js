var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
* Profile
* 		- Administrator
*		- Usuário
*		- Analista
*/

var profileSchema = new Schema({
	'description' : 	{type: String, trim: true, required: true, unique: true}
});

module.exports = mongoose.model('Profile', profileSchema);
 