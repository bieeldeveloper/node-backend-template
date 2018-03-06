var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var usuarioSchema = new Schema({
	'login' : {type: String, required: true, unique: true, lowercase: true},
	'senha' : {type: String, required: true},
	'perfil' : { type: Schema.Types.Number, ref: 'Perfil', required: true }, 
	'autoEscola' : { type: Schema.Types.ObjectId, ref: 'AutoEscola', required: true},
	'ativo': { type: Number, default: 1 },
	'dadosPessoais':{
		'nome' : {type: String, required: true},
		'rg' : {type: String},
		'cpf' : {type: String},
		'registro' : {type: String},
		'dataNascimento' : {type: Date}
	},
	'contato':{
		'email':{type: String, lowercase: true},
		'celular' : {type: String},
		'telefone' : {type: String}
	},
	'endereco':{
		'cep' : {type: String, trim: true},
		'estado' : {type: String, trim: true},
		'cidade' : {type: String, trim: true},
		'bairro' : {type: String, trim: true},
		'endereco' : {type: String, trim: true},
		'numero' : {type: String},
		'complemento' : {type: String, trim: true}
	},
	'dataCadastro' :  {
				'data': Date,
				'usuario' : { type: Schema.Types.ObjectId, ref: 'Usuario' }},
	'dataAtualizacao' : [{
				'data': { type: Date, default: Date.now },
				'usuario': { type: Schema.Types.ObjectId, ref: 'Usuario' }}]
	
});


module.exports = mongoose.model('Usuario', usuarioSchema);