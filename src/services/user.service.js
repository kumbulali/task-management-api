const { invalid_credentials } = require('../config/error.messages.config'),
    User = require('../models/user.model'),
    _ = require('lodash');
const { signJwt } = require('../utils/jwt.util');

function removeCredentials(userObject) {
    return _.omit(userObject.toObject(), ['password', 'salt', '__v']);
}

module.exports.registerUser = async function (email, password) {
    var createdUser = await User.create({ email: email, password: password });
    createdUser = removeCredentials(createdUser);
    createdUser.authToken = signJwt({ userId: createdUser._id, email: createdUser.email });
    return createdUser;
};

module.exports.loginUser = async function(email, password){
    var foundUser = await User.findOne({email: email});
    if(!foundUser)
        throw invalid_credentials;
    if(foundUser.authenticate(password)){
        foundUser = removeCredentials(foundUser);
        foundUser.authToken = signJwt({userId: foundUser._id, email: foundUser.email});
        return foundUser;
    }
    else{
        throw invalid_credentials;
    }
};