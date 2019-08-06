var mysql = require('../models/db');
var connection = mysql.connection;

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.list = function (req, res) {
    query = 'Select id_t, name, time from Test';
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};

module.exports.findTest = function (req, res) {
    query = 'Select * from Test where status = 1';
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};

module.exports.createTest = function (req, res) {
    query = "insert into Test(name, time, status) values ('" + req.body.name + "','" + req.body.time + "', 0);";
    connection.query(query, function (err, data) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};

module.exports.createQuestions = function (req, res) {
    query = "insert into Questions set text='" + req.body.text + "', type='" + req.body.type + "', suffix='" + req.body.suffix + "',id_t = (select id_t from Test where name='" + req.body.name + "')";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });

};

module.exports.createAnswers = function (req, res) {
    query = "insert into Answers set answer='" + req.body.answer + "', correct=" + req.body.correct + ", left_a= '" + req.body.left + "',right_a= '" + req.body.right + "', percent= " + req.body.percent + ",low=" + req.body.low + ",high=" + req.body.high + ",id_q = (select id_q from Questions where text='" + req.body.text + "' and id_t in (select id_t from Test where name = '" + req.body.name + "'))";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.deleteR = function (req, res) {
    query = "delete from Results where id_t in (select id_t from Test where id_t=" + req.params.id + ");";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.deleteA = function (req, res) {
    query = "delete from Answers where id_q in (select id_q from Questions where id_t=" + req.params.id + ");";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.deleteQ = function (req, res) {
    query = "delete from Questions where id_t=" + req.params.id + ";";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.deleteT = function (req, res) {
    query = "delete from Test where id_t=" + req.params.id + ";";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.getQuestions = function (req, res) {
    query = 'Select type, text, suffix,id_q from Questions where id_t=' + req.params.id;
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.getAnswers = function (req, res) {
    query = 'Select * from Answers where id_q=' + req.params.id;
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.update = function (req, res) {
    query = "update Test set status = 0 ";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.startTest = function (req, res) {
    query = "update Test set status = 1 where id_t =" + req.params.id;
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};

module.exports.result = function (req, res) {
    query = "insert into Results(fio, result, id_t) values ('" + req.body.name + "','" + req.body.result + "', " + req.body.id_t + ");";
    connection.query(query, function (err, data) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.listResult = function (req, res) {
    query = 'Select * from Results where id_t=' + req.params.id;
    connection.query(query, function (err, data) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};
module.exports.getResult = function (req, res) {
    query = 'Select * from Results where id_r=' + req.params.id;
    connection.query(query, function (err, data) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};

module.exports.deleteResult = function (req, res) {
    query = "delete from Results where id_r=" + req.params.id + ";";
    connection.query(query, function (err, data, fields) {
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            sendJsonResponse(res, 200, data);
        }
    });
};