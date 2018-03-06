'use strict';

const {logger, asyncRoute, ensureLoggedIn} = require('../route_default_lib');
const PerfilBusiness = require('../../../../business/usuario/perfil_business');

module.exports = (router) => {
	router.get('/perfil', asyncRoute(buscarPerfils));
}

const buscarPerfils = async function(req, res){
	let perfilBusiness = new PerfilBusiness();
	let perfil = await perfilBusiness.getPerfils()
	return res.status(200).json(perfil);
}
