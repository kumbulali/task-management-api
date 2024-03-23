const dotenv = require('dotenv');

dotenv.config();

const SERVER = {
    hostname: process.env.HOSTNAME || "localhost",
    port: process.env.PORT || 3000
};

const config = {
    server: SERVER,
    jwtSecret: process.env.JWT_SECRET
};

module.exports = config;