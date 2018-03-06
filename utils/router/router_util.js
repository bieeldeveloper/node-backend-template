const asyncRoute = function asyncWrap(fn) {
    return (req,res,next) => {
        fn(req,res,next).catch((error) => {
            //console.log('teste');
            return next(error);
        });
    };
};

module.exports.asyncRoute = asyncRoute;
