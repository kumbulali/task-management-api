const UserService = require('../services/user.service'),
    { signJwt } = require('../utils/jwt.util');

module.exports.register = async (req, res, next) => {
    try {
        const email = req.body.email,
            password = req.body.password;
        const createdUser = await UserService.registerUser(email, password);

        res.status(201).send(createdUser);
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const email = req.body.email,
            password = req.body.password;
        const loggedInUser = await UserService.loginUser(email, password);
        req.session.userId = loggedInUser._id;
        res.send(loggedInUser);
    } catch (err) {
        next(err);
    }
};

module.exports.googleAuthCallback = function (req, res) {
    var user = req.user.toObject();
    user.authToken = signJwt({userId: user._id, email: user.email});
    res.send(user);
};

module.exports.logout = function (req, res, next) {
    req.logout(function (err) {
        if (err) return next(err);
        res.send({ message: 'Logged out successfully' });
    });
};