'use strict';
const passport = require('passport');

const defaultRouteLibs = {
    Logger : require('../../../utils/logger/logger'),
    asyncRoute : require('../../../utils/router/router_util').asyncRoute,
    ensureLoggedIn : passport.authenticate('jwt', { session: false })
};


module.exports = defaultRouteLibs;
