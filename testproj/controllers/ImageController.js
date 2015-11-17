var express = require('express');
var Item = require('../models/item');
var SQLConsts = require('../constants/SQLSequences');
var Time = require('../tools/getTime');
var fs = require("fs");
var db = require("../db/mysqlLib");


ImageController = function () {};

//upload item image
ImageController.prototype.uploadFile = function (req, res) {
    var file = req.files.file;
    var id = req.params.id;
    var image = "/images/" + id;
    var filename = id + ".jpg";
    var savePath = "/images/";
    var full = savePath + filename;
    var token = req.headers.authorization;
    db.getConnection(function (err3, connection) {
        connection.query(SQLConsts.GETUSERBYTOKEN, [token], function (err2, rows2, fields2) {
            if (!err2 && rows2.length == 1 && !Time.isTokenOld("" + rows2[0].time)) {
                var userId = rows2[0].id;
                connection.query(SQLConsts.GETITEMBYID, [id], function (err1, rows1, fields1) {
                    if (!err1 && rows1.length == 1) {
                        if (userId != rows1[0].user) {
                            res.status(403).end();
                        } else {
                            fs.readFile(file.path, function (err, data) {
                                fs.writeFile(__dirname + "/.." + full, data, 'binary', function (err0) {
                                    if (!err0) {
                                        connection.query(SQLConsts.UPDATEIMAGE, [image, id], function (err4, result4) {
                                            if (!err4 && result4.affectedRows == 1) {
                                                var item = new Item(rows1[0].id, rows1[0].time, rows1[0].title, rows1[0].price, image, rows1[0].user);
                                                res.status(200).json(item);
                                            } else {
                                                res.status(403).end();
                                                fs.unlink(full);
                                            }
                                        });
                                    } else {
                                        res.status(403).end();
                                    }
                                });
                            });
                        }
                    } else {
                        res.status(404).end();
                    }
                });
            } else {
                res.status(401).end();
            }
        });
        connection.release();
    });
}

module.exports = new ImageController();
