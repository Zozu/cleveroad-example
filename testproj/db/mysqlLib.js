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

scope.query = function (sql, props) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            connection.query(
                sql, props,
                function (err, res) {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
            connection.release();
        });
    });
};


module.exports = scope;
