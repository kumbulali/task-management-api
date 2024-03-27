const _ = require('lodash'),
    jwtUtil = require('../utils/jwt.util');

module.exports.checkJwt = async (req, res, next) => {
    try {
        const jwtPayload = jwtUtil.getPayloadFromReq(req);
        res.locals.jwtPayload = jwtPayload;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};