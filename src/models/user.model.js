const mongoose = require('mongoose'),
    crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
    }
    else
        return password;
};

UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;