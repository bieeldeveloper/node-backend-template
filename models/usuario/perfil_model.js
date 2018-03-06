var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
* Perfil
* 		- Administrador
*		- Intrutor
*		- CFC
*		- Aluno
*/

var perfilSchema = new Schema({
	_id : 	{type: Number, unique: true, required: true},
	'descricao' : 	{type: String, trim: true, required: true, unique: true}
});

module.exports = mongoose.model('Perfil', perfilSchema);
 