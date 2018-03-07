'use strict';

const {logger, asyncRoute, ensureLoggedIn} = require('../route_default_lib');
const jwt = require('jsonwebtoken');

const UserBusiness = require('../../../../business/user/user_business');

module.exports = (router) => {
	router.get('/users',asyncRoute(getUsers));
	router.get('/user/:id',asyncRoute(getUserById));
	router.post('/user', asyncRoute(postUser));
	router.put('/user/:id',asyncRoute(putUser));

}

const getUsers = async function(req, res){
	let userBusiness = new UserBusiness();
	let users = await userBusiness.searchUsers();
	return res.status(200).json(users);
}

const getUserById = async function(req, res){
	const id = req.params.id;
	let userBusiness = new UserBusiness();
	let user = await userBusiness.searchUsersById(id);
	return res.status(200).json(user);
}

const postUser = async function(req, res){
	let userBusiness = new UserBusiness();
	let user = await userBusiness.createUser(req.body);
	return res.status(201).json(user);
}

const putUser = async function(req, res){
	const id = req.params.id;
	let userBusiness = new UserBusiness();
	let user = await userBusiness.updateUser(id,req.body);
	return res.status(200).json(user);
}

