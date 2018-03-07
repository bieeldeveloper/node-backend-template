'use strict';

const {logger, asyncRoute, ensureLoggedIn} = require('../route_default_lib');
const ProfileBusiness = require('../../../../business/user/profile_business');

module.exports = (router) => {
	router.get('/profile', asyncRoute(searchProfile));
}

const searchProfile = async function(req, res){
	let profileBusiness = new ProfileBusiness();
	let profiles = await profileBusiness.searchProfile();
	return res.status(200).json(profiles);
}
