'use strict';

const {logger, asyncRoute, ensureLoggedIn} = require('../route_default_lib');
const jwt = require('jsonwebtoken');

const UsuarioBusiness = require('../../../../business/usuario/usuario_business');

module.exports = (router) => {
	router.post('/usuarios/usuario/login',asyncRoute(login));
	router.post('/signup',asyncRoute(primeiroAcesso));
	router.get('/usuarios',ensureLoggedIn,asyncRoute(getUsuarios));
	router.get('/usuarios/usuario/:id',asyncRoute(getUsuarioById));
	router.post('/usuarios', asyncRoute(createUsuario));
	router.delete('/usuarios/usuario/:id',asyncRoute(deleteUsuario));
	router.put('/usuarios/usuario/:id',asyncRoute(updateAutoEscola));

}


const login = async function (req, res) {
    if(req.body.usuario && req.body.senha) {
        const {usuario, senha} = req.body;
        const user = await UsuarioBusiness.authenticateUser({
            usuario : usuario,
            plainTextPassword : senha
        });
        const jwtPayload = {
            id : user._id
        };
        const jwtOpts = {
            algorithm : 'HS384',
            expiresIn : '2h'
        };
        const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOpts);
        return res.status(200).json({
            message : 'ok',
            user : {
                id : user._id,
                token : jwtToken
            }});
    }
};

const getUsuarioById = async function(req, res){
	const id = req.params.id;
	let usuarioBusiness = new UsuarioBusiness();
	let usuario = await usuarioBusiness.getUsuarioById(id);
	return res.status(200).json(usuario);
}

const getUsuarios = async function(req, res){
	let usuarioBusiness = new UsuarioBusiness();
	let usuario = await usuarioBusiness.getUsuarios();
	return res.status(200).json(usuario);
}


const createUsuario = async function(req, res){
	let usuarioBusiness = new UsuarioBusiness();
	let usuario = await usuarioBusiness.postUsuario(req.body)
	return res.status(201).json(usuario);
}

const deleteUsuario = async function(req, res){
	const id = req.params.id;
	let usuarioBusiness = new UsuarioBusiness();
	let usuario = await usuarioBusiness.deleteUsuario(id);
	return res.status(200).json(usuario);
}

const updateAutoEscola = async function(req, res){
	const id = req.params.id;
	let usuarioBusiness = new UsuarioBusiness();
	let usuario = await usuarioBusiness.putUsuario(id,req.body);
	return res.status(200).json(usuario);
}

const primeiroAcesso = async function(req, res){
	let usuarioBusiness = new UsuarioBusiness();
	let usuario = await usuarioBusiness.postPrimeiroAcesso(req.body)
	return res.status(201).json(usuario);
}

