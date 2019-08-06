var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'qrtest'
});

connection.connect(function (error) {
    if (!error) {
        console.log('Успешное подключение к mysql серверу!');
        var sql1 = "CREATE TABLE IF NOT EXISTS Test " +
            " (id_t INT not null AUTO_INCREMENT primary key, " +
            " name VARCHAR(100) UNIQUE, " +
            " time int , " +
            " status BOOLEAN ) ";

        var sql2 = "CREATE TABLE IF NOT EXISTS Questions " +
            " (id_q INT not null AUTO_INCREMENT primary key, " +
            " text VARCHAR(200), " +
            " id_t int ," +
            " type varchar(5)," +
            " suffix varchar(100)," +
            " FOREIGN KEY (id_t)  REFERENCES Test(id_t) )";

        var sql3 = "CREATE TABLE IF NOT EXISTS Answers " +
            " (id_a INT not null AUTO_INCREMENT primary key, " +
            " answer VARCHAR(200), " +
            " id_q int ," +
            " correct BOOLEAN ," +
            " left_a varchar(100)," +
            " right_a varchar(100)," +
            " percent int," +
            " low float," +
            " high float," +
            " FOREIGN KEY (id_q)  REFERENCES Questions(id_q) )";

        var sql4 = "CREATE TABLE IF NOT EXISTS Results " +
            " (id_r INT not null AUTO_INCREMENT primary key, " +
            " fio VARCHAR(100) , " +
            " id_t int ," +
            " result varchar(10)," +
            " FOREIGN KEY (id_t)  REFERENCES Test(id_t) )";

        var sql5 = "CREATE TABLE IF NOT EXISTS users " +
            " (id_u INT not null AUTO_INCREMENT primary key, " +
            " name VARCHAR(50), " +
            " status BOOLEAN, " +
            " hash varchar(256), " +
            " salt varchar(256))";
        connection.query(sql1, function (err, results) {
            if (err) throw err;
            console.log("Таблица Test подключена");
        });
        connection.query(sql2, function (err, results) {
            if (err) throw err;
            console.log("Таблица Questions подключена");
        });
        connection.query(sql3, function (err, results) {
            if (err) throw err;
            console.log("Таблица Answers подключена");
        });
        connection.query(sql4, function (err, results) {
            if (err) throw err;
            console.log("Таблица Results подключена");
        });
        connection.query(sql5, function (err, results) {
            if (err) throw err;
            console.log("Таблица users подключена");
        });
    } else {
        console.log(error);
    }
});

module.exports.connection = connection;