const jwt = require('jsonwebtoken'),
    config = require('../config/environment.variables.config');

module.exports.signJwt = (payload) => {
    const token = jwt.sign(payload,
        config.jwtSecret,
        { expiresIn: "1h" })

    return token;
};

module.exports.getPayloadFromReq = (req) => {
    const token = req.headers["authorization"];
    const bearerToken = token.slice(7);
    return jwt.verify(bearerToken, config.jwtSecret);
};

module.exports.getPayloadFromToken = (bearerToken) => {
    return jwt.verify(bearerToken, config.jwtSecret);
};
