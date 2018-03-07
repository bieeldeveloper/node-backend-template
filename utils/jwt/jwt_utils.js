"use strict";

const UserBusiness = require('../../business/user/user_business');

const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtractor = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = jwtExtractor.fromAuthHeader();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = ['HS384'];


module.exports = new jwtStrategy(opts, function(jwtPayload, next) {
    try {
        UserBusiness.searchUserById(jwtPayload.id).then((user) => {
            if (user) {
                return next(null, user);
            } else {
                return next(null, false);
            }
        });
    } catch (error) {
        return next(error, false);
    }

});
