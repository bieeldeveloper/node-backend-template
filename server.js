'use strict';
const path = require('path');
const ENV = process.env.NODE_ENV;

require('dotenv').config({path : path.resolve(__dirname, 'config', 'env', 'dev.env')});

const http = require('http');
const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const Boom = require('boom');
const passport = require("passport");
const logger = require('./utils/logger/logger');
const methodOverride = require('method-override')


// connection db mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

const app = express();

if ('development' === process.env.NODE_ENV) {
    const errorhandler = require('errorhandler');
    const morgan = require('morgan');

    // o codigo abaixo estava misturando os logs na console.
    //app.use(morgan('dev', { "stream": logger.stream }));

    // app.use(morgan('dev'));
    app.use(errorhandler({
        log : true
    }));
}

app.use(passport.initialize());
passport.use(require('./utils/jwt/jwt_utils'));

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(methodOverride());


const router = express.Router();
require('./routes/api/v1/user/user_routes')(router);
require('./routes/api/v1/user/profile_routes')(router);
require('./routes/api/v1/authentication/login_routes')(router);

app.use('/core/api/v1', router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use(function(error, req, res, next) {
    logger.debug(error);
    if(error.isBoom) {
        return res.status(error.output.statusCode).json(error);
    }
    let internalServerError = Boom.badImplementation('Ocorreu um erro :(', error);
    return res.status(internalServerError.output.statusCode).json(internalServerError);
});

http.createServer(app).listen(process.env.PORT, function() {
 	logger.info(`The ${process.env.PROJECT_NAME} is listening on port ${this.address().port} in ${ENV} mode.`);
});

