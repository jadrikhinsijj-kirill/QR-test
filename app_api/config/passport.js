var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('../models/db');
var connection = mysql.connection;
var userSchema = require('../models/users');

passport.use(new LocalStrategy({
        usernameField: 'name'
    },
    function (username, password, done) {

        query = 'select name,hash,salt from users where name=\'' + username + '\'';

        connection.query(query, function (err, data, fields) {
            if (err) {
                return done(err);
            }


            if (data.length == 0) {
                return done(null, false, {
                    message: 'Неверное имя пользователя'
                });
            }
            userSchema.hash = data[0]['hash'];
            userSchema.salt = data[0]['salt'];

            if (!userSchema.validPassword(password)) {
                return done(null, false, {
                    message: 'Неверное имя пользователя'
                });
            }

            return done(null, userSchema);
        });
    }
));