var mysql = require("mysql");
var scope = {};
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_db'
});

scope.getConnection = function (callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        callback(err, conn);
    });
};


module.exports = scope;
