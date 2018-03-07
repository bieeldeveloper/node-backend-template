'use strict';

const {logger, asyncRoute, ensureLoggedIn} = require('../route_default_lib');
const jwt = require('jsonwebtoken');

const LoginBusiness = require('../../../../business/authentication/login_business');

module.exports = (router) => {
	router.post('/login',asyncRoute(login));
}


const login = async function (req, res) {
    if(req.body.login && req.body.password) {
        const {login, password} = req.body;
        const user = await LoginBusiness.authenticateUser({
            login : login,
            plainTextPassword : password
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
            message : 'Authorized',
            user : {
                id : user._id,
                token : jwtToken
            }});
    }
};


