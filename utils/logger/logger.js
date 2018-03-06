var winston = require('winston');
winston.emitErrs = true;

const ENV = process.env.NODE_ENV;
let transports = [];

if('development' === ENV) {
    transports.push(new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }));

} else if('production' === ENV) {
    //@todo incluir log para prd
}

let logger = new winston.Logger({
    transports: transports,
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
