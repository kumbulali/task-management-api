const dotenv = require('dotenv');

dotenv.config();

const SERVER = {
    hostname: process.env.HOSTNAME || "localhost",
    port: process.env.PORT || 3000,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};

const config = {
    server: SERVER,
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET
};

module.exports = config;