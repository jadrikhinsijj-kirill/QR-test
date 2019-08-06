var mysql = require('../models/db');
var connection = mysql.connection;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new Array({
    name: String,
    hash: String,
    salt: String,
    status: Number
});

userSchema.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        id_u: this.id_u,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000)
    }, 'thisIsSecret');
};

module.exports = userSchema;