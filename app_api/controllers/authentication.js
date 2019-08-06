var passport = require('passport');
var mysql = require('../models/db');
var connection = mysql.connection;
var userSchema = require('../models/users');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {

    if (!req.body.name || !req.body.password) {
        sendJsonResponse(res, 400, {
            "message": "Поля 'Логин' и 'Пароль' обязательны"
        });
        return;
    }


    userSchema.name = req.body.name;
    userSchema.setPassword(req.body.password);
    userSchema.status = req.body.status;
    checkLogin = 'select id_u from users where name=\'' + userSchema.name + '\'';
    connection.query(checkLogin, function (err, data, fields) {

        if (data.length == 0) {
            query = "insert into users(name,hash,salt,status) values('" + userSchema.name + "','" + userSchema.hash + "','" + userSchema.salt + "',0)";

            connection.query(query, function (err, data, fields) {
                var token;

                if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    token = userSchema.generateJwt();
                    sendJsonResponse(res, 200, {
                        "token": token
                    });
                }
            });
        } else {
            //
            sendJsonResponse(res, 400, {
                "message": "Такой логин уже существует"
            });
            return;
        }
    });

};

module.exports.login = function (req, res) {

    if (!req.body.name || !req.body.password) {
        sendJsonResponse(res, 400, {
            "message": "Поля 'Логин' и 'Пароль' обязательны"
        });
        return;
    }

    query1 = "update users set status = 1 where name ='" + req.body.name + "'";

    connection.query(query1, function (err, results) {
        if (err) throw err;
    });

    passport.authenticate('local', {}, function (err, userSchema, info) {
        var token;

        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }

        if (userSchema.status != req.body.status) {
            sendJsonResponse(res, 404, {
                "message": "Неверное имя пользователя"
            });
            return;
        }
        console.log(userSchema);
        if (userSchema) {
            token = userSchema.generateJwt();
            sendJsonResponse(res, 200, {
                "token": token
            });
        } else {
            sendJsonResponse(res, 401, info);
        }


    })(req, res);
};

module.exports.statusUser = function (req, res) {
    query = "update users set status = 0 ";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};

module.exports.getUser = function (req, res) {
    query = "select * from users where status = 1 ";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            var token;
            if (data) {
                token = userSchema.generateJwt();
                sendJsonResponse(res, 200, {
                    "token": token
                });
            } else {
                sendJsonResponse(res, 401, err);
            }
        }
    });

};