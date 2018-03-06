const Joi = require('joi');

const usuarioSchema = {	
	login: Joi.string().min(3).max(25).required(),
	senha: Joi.string().min(3).max(40).required(),
	perfil: Joi.required(),
	autoEscola: Joi.required(),
	dadosPessoais:{
		nome : Joi.string().required(),
		rg : Joi.optional(),
		cpf : Joi.string().length(11).required(),
		registro : Joi.optional(),
		dataNascimento : Joi.optional()
	},
	contato:{
		email:Joi.optional(),
		celular : Joi.optional(),
		telefone : Joi.optional()
	},
	endereco:{
		cep : Joi.optional(),
		estado : Joi.optional(),
		cidade : Joi.optional(),
		bairro : Joi.optional(),
		endereco : Joi.optional(),
		numero : Joi.optional(),
		complemento : Joi.optional()
	},
	dataCadastro:{
		usuario: Joi.optional(),
		data: Joi.optional()
	}
}

module.exports = Joi.object().keys(usuarioSchema);