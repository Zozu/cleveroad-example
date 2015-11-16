var express = require('express');


var User = require('../models/user');
var Item = require('../models/item');
var Tokenize = require('../tools/token-generator');
var SQLConsts = require('../constants/SQLSequences');
var db = require("../db/mysqlLib");
var Time = require('../tools/getTime');
var mysql = require("mysql");


var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html');
});
router.get('/main', function (req, res, next) {
    res.render('index.html');
});
router.get('/user/*', function (req, res, next) {
    res.render('index.html');
});
router.get('/item/*', function (req, res, next) {
    res.render('index.html');
});
router.get('/login', function (req, res, next) {
    res.render('index.html');
});
router.get('/catalog*', function (req, res, next) {
    res.render('index.html');
});
router.get('/registration', function (req, res, next) {
    res.render('index.html');
});


//var multer = require('multer');
//var fs = require('fs');

//login
router.post('/api/login', function (req, res, next) {
    var user = new User("", req.body.email, "", "", "login");
    user.pass = req.body.pass;
    if (user.isValid) {
        db.getConnection(function (err3, connection) {
            connection.query(SQLConsts.LOGIN, [user.email, user.pass], function (err1, rows1, fields1) {
                //db.query(SQLConsts.LOGIN, [user.email, user.pass]).then( function (err1, rows1) {
                if (!err1 && rows1.length == 1 && rows1[0].email == user.email) {
                    var token = Tokenize.token();
                    var time = Time.getTimeString();
                    connection.query(SQLConsts.UPDATETOKEN, [token, time, user.email], function (err, result) {
                        if (!err && result.affectedRows == 1) {
                            res.status(200).json({
                                token: token,
                                time: time
                            });
                        } else {
                            res.status(422).json(errorMessage("pass", "Try later"));
                        }
                    });
                } else {
                    res.status(422).json(errorMessage("pass", "Wrong email or password"));
                }
            });
            connection.release();
        });
    } else {
        res.status(422).json(user.errors);
    }
});

//registration
router.post('/api/register', function (req, res) {
    var user = new User("", req.body.email, req.body.name, req.body.tel, "registration");
    user.pass = req.body.pass;
    user.repeatPass = req.body.repeatPass;
    if (user.isValid) {
        db.getConnection(function (err3, connection) {
            connection.query(SQLConsts.GETUSERCONSIST, [req.body.email], function (err1, rows1, fields1) {
                if (err1 || rows1.length > 0) {
                    console.log(err);
                    console.log(rows1);
                    res.status(422).json(errorMessage("email", "User already exist..."));
                } else {
                    connection.query(SQLConsts.GETMAXUSER, function (err, rows, fields) {
                        if (!err && rows.length == 1) {
                            var n = parseInt(rows[0].maxid) + 1;
                            user.id = n;
                            var token = Tokenize.token();
                            var time = Time.getTimeString();
                            connection.query(SQLConsts.CREATEUSER, [user.id, user.email, user.pass, user.name, user.tel, token, time], function (err, result) {
                                if (!err && result.affectedRows == 1) {
                                    res.status(200).json({
                                        token: token
                                    });
                                }
                            });
                        }
                    });
                }
            });
            connection.release();
        });
    } else {
        console.log(user.errors);
        res.status(422).json(user.errors);
    }
});

//get current user
router.get('/api/me', function (req, res) {
    var token = req.headers.authorization;
    db.getConnection(function (err3, connection) {
        connection.query(SQLConsts.GETUSERBYTOKEN, [token], function (err, rows, fields) {
            if (!err) {
                if (rows.length == 1 && !Time.isTokenOld("" + rows[0].time)) {
                    res.status(200).json(rows[0]);
                } else {
                    res.status(401).end();
                }
            } else
                res.status(422).send("Try later");
        });
        connection.release();
    });
});

//update current user
router.put('/api/me', function (req, res) {
    var user = new User("", req.body.email, req.body.name, req.body.tel, "");
    var token = req.headers.authorization;
    user.newPass = req.body.newPass;
    user.repeatPass = req.body.repeatPass;
    user.pass = req.body.pass;
    if (user.isValid) {
        db.getConnection(function (err3, connection) {
            connection.query(SQLConsts.GETTOKENTIME, [token], function (err2, rows2, fields) {
                if (!err2 && rows2.length == 1 && !Time.isTokenOld("" + rows2[0].time)) {
                    user.id = rows2[0].id;
                    if (user.pass) {
                        connection.query(SQLConsts.UPDATEPASS, [user.newPass, user.id, user.pass], function (err1, result) {
                            if (!err1 && result.affectedRows == 1) {
                                connection.query(SQLConsts.UPDATEUSER, [user.email, user.name, user.tel, token], function (err, result) {
                                    if (!err && result.affectedRows == 1) {
                                        res.status(200).json({
                                            email: user.email,
                                            id: user.id,
                                            name: user.name,
                                            tel: user.tel
                                        });
                                    } else
                                        res.status(401).end();
                                });
                            } else
                                res.status(422).json(errorMessage("pass", "Wrong current password"));
                        });
                    } else {
                        console.log(3);
                        connection.query(SQLConsts.UPDATEUSER, [user.email, user.name, user.tel, token], function (err, result) {
                            if (!err && result.affectedRows == 1) {
                                res.status(200).json({
                                    email: user.email,
                                    id: user.id,
                                    name: user.name,
                                    tel: user.tel
                                });
                            } else
                                res.status(401).end();
                        });
                    }
                } else {
                    res.status(401).end();
                }
            });
            connection.release();
        });
    } else {
        res.status(422).json(user.errors);
        console.log(user.errors);
    }
});

//get user by ID
router.get('/api/user/:id', function (req, res) {
    var reqId = req.params.id;
    db.getConnection(function (err1, connection) {
        connection.query(SQLConsts.GETUSERBYID, [reqId], function (err, rows, fields) {
            if (!err && rows.length == 1) {
                var user = {
                    email: rows[0].email,
                    id: rows[0].id,
                    tel: rows[0].tel,
                    name: rows[0].name
                }
                res.status(200).json(user);
            } else
                res.status(404).end();
        });
        connection.release();
    });
});

//search users
router.get('/api/user', function (req, res) {
    if (!!req.query.name) {
        var searchName = "";
        var spl = req.query.name.split(' ');
        for (var i = 0; i < spl.length; i++) {
            searchName += " +" + spl[i] + "*";
        }
    } else
        var searchName = "";
    var searchEmail = (!!req.query.email) ? (" +" + req.query.email) : ("");
    db.getConnection(function (err3, connection) {
        var sq = "SELECT user.id, user.tel, user.name, user.email FROM user WHERE MATCH (email,name) AGAINST ('" + searchName + searchEmail + " IN BOOLEAN MODE');"
            //connection.query(SQLConsts.SEARCHUSER, [searchName + "" + searchEmail], function (err, rows, fields) {
        connection.query(sq, function (err, rows, fields) {
            console.log(rows);
            if (!err) {
                res.status(200).json(rows);
            }
        });
        connection.release();
    });

});

//search items
router.get('/api/item', function (req, res) {
    if (!!req.query.title) {
        var searchTitle = "";
        var spl = req.query.title.split(' ');
        for (var i = 0; i < spl.length; i++) {
            searchTitle += " +" + spl[i] + "*";
        }
    } else
        var searchTitle = "";
    var searchUser = (req.query.user_id != undefined) ? ("item.user = " + req.query.user_id) : ("");
    var stringSearch = (!!searchTitle) ? ("MATCH (title) AGAINST ('" + searchTitle + " IN BOOLEAN MODE')") : searchUser;
    var searchOrder = (!!req.query.order_by) ? req.query.order_by : ("created_at");
    var searchOrdType = (!!req.query.order_type) ? req.query.order_type.toUpperCase() : ("DESC");
    var sq = "SELECT item.id, item.created_at, item.title, item.price, item.image, item.user FROM item WHERE " + stringSearch + " ORDER BY " + searchOrder + " " + searchOrdType + " ;";
    console.log(sq);
    db.getConnection(function (err3, connection) {
        if (!err3) {
            //connection.query(SQLConsts.SEARCHITEMS, [stringSearch, searchOrder, searchOrdType], function (err, rows, fields) {
            connection.query(sq, function (err, rows, fields) {
                if (!err) {
                    res.status(200).json(rows);
                }
            });
        }
        connection.release();
    });
});

//get item by ID
router.get('/api/item/:id', function (req, res) {
    var reqId = req.params.id;
    db.getConnection(function (err3, connection) {
        connection.query(SQLConsts.GETITEMBYID, [reqId], function (err, rows, fields) {
            console.log(err);
            if (!err && rows.length == 1) {
                console.log(3);
                var item = {
                    title: rows[0].title,
                    id: rows[0].id,
                    time: rows[0].time,
                    price: rows[0].price,
                    image: rows[0].image,
                    user: rows[0].user,

                }
                res.status(200).json(item);
            } else
                res.status(404).end();
        });
        connection.release();
    });
});

//update item
router.put('/api/item/:id', function (req, res) {
    var item = new Item();
    item.id = req.params.id;
    item.title = req.body.title;
    item.price = req.body.price;
    var token = req.headers.authorization;
    if (item.isValid) {
        db.getConnection(function (err3, connection) {
            connection.query(SQLConsts.GETTOKENTIME, [token], function (err2, rows2, fields) {
                if (!err2 && rows2.length == 1 && !Time.isTokenOld("" + rows2[0].time)) {
                    item.user = rows2[0].id;
                    connection.query(SQLConsts.GETITEMBYID, [item.id], function (err, rows, fields) {
                        if (!err && rows.length == 1) {
                            if (item.user != rows[0].user) {
                                res.status(403).end();
                            } else {
                                connection.query(SQLConsts.UPDATEITEM, [item.title, item.price, item.id], function (err1, result) {
                                    if (!err1 && result.affectedRows == 1) {
                                        item.image = rows[0].image;
                                        item.time = rows[0].time;
                                        res.status(200).json(item);
                                    } else
                                        res.status(403).end();
                                });
                            }
                        } else
                            res.status(404).end();
                    });

                } else
                    res.status(401).end();
            });
            connection.release();
        });
    } else {
        console.log(item.errors);
        res.status(422).json(item.errors);
    }
});

//delete item
router.delete('/api/item/:id', function (req, res) {
    var itemId = parseInt(req.params.id);
    var token = req.headers.authorization;
    db.getConnection(function (err3, connection) {
        connection.query(SQLConsts.GETUSERBYTOKEN, [token], function (err2, rows2, fields2) {
            if (!err2 && rows2.length == 1 && !Time.isTokenOld("" + rows2[0].time)) {
                var userId = rows2[0].id;
                connection.query(SQLConsts.GETITEMBYID, [itemId], function (err, rows, fields) {
                    if (!err && rows.length == 1) {
                        if (userId != rows[0].user) {
                            res.status(403).end();
                        } else {
                            connection.query(SQLConsts.DELETEITEM, [itemId], function (err1, result) {
                                console.log(err1);
                                console.log(result);
                                if (!err1 && result.affectedRows == 1) {
                                    res.status(200).end();
                                } else {
                                    res.status(404).end();
                                }
                            });
                        }
                    } else res.status(404).end();
                });
            } else res.status(401).end();
        });
        connection.release();
    });
});

//create item
router.post('/api/item', function (req, res) {
    var item = new Item();
    item.title = req.body.title;
    item.price = req.body.price;
    var token = req.headers.authorization;
    db.getConnection(function (err3, connection) {
        connection.query(SQLConsts.GETUSERBYTOKEN, [token], function (err1, rows1, fields1) {
            if (!err1 && rows1.length == 1 && !Time.isTokenOld("" + rows1[0].time)) {
                item.user = rows1[0].id;
                item.time = Time.getTimeString();
                item.image = "";
                connection.query(SQLConsts.GETMAXITEM, function (err, rows, fields) {
                    if (!err && rows.length == 1) {
                        item.id = rows[0].maxid + 1;
                        if (item.isValid) {
                            connection.query(SQLConsts.CREATEITEM, [item.id, item.time, item.title, item.price, item.image, item.user], function (err1, result) {
                                console.log(err1);
                                console.log(result);
                                if (!err1 && result.affectedRows == 1) {
                                    res.status(200).json(item);
                                } else {
                                    res.status(404).end();
                                }
                            });
                        } else {
                            res.status(422).send(item.errors);
                        }
                    } else res.status(403).end();
                });
            } else res.status(401).end();
        });
        connection.release();
    });
});

//upload item image
/*router.post('/api/item/:id/image',.single('upl'), function (req, res) {
    //TODO
    var id = req.params.id;
    //var imageFile = req.files.file;
    console.log(req.file);
    var image = "";
    var token = req.headers.authorization;
    db.getConnection(function (err3, connection) {
        connection.query(SQLConsts.GETUSERBYTOKEN, [token], function (err2, rows2, fields2) {
            if (!err2 && rows2.length == 1 && !Time.isTokenOld("" + rows2[0].time)) {
                var userId = rows2[0].id;
                connection.query(SQLConsts.GETITEMBYID, [id], function (err, rows, fields) {
                    console.log(rows[0]);
                    if (!err && rows.length == 1) {
                        if (userId != rows[0].user) {
                            res.status(403).end();
                        } else {
                            connection.query(SQLConsts.UPDATEIMAGE, [image, id], function (err1, result) {
                                if (!err1 && result.affectedRows == 1) {
                                    var item = {
                                        title: (rows[0].title),
                                        id: rows[0].id,
                                        time: rows[0].time,
                                        price: (rows[0].price),
                                        image: image,
                                        user: rows[0].user,
                                    }
                                    res.status(200).json(item);
                                } else
                                    res.status(403).end();
                            });
                        }
                    } else
                        res.status(404).end();
                });

            } else
                res.status(401).end();
        });
            connection.release();
    });

});*/

//remove item image
router.delete('/api/item/:id/image', function (req, res) {
    var token = req.headers.authorization;
    db.getConnection(function (err3, connection) {
        connection.query(SQLConsts.GETUSERBYTOKEN, [token], function (err2, rows2, fields2) {
            if (!err2 && rows2.length == 1 && !time.isTokenOld("" + rows2[0].time)) {
                var userId = rows2[0].id;
                connection.query(SQLConsts.GETITEMBYID, [itemId], function (err, rows, fields) {
                    if (!err && rows.length == 1) {
                        if (userId != itemId) {
                            res.status(403).end();
                        } else {
                            connection.query(SQLConsts.UPDATEIMAGE, [null, itemId], function (err1, result) {
                                if (!err1 && result.affectedRows == 1) {
                                    var item = {
                                        title: (rows[0].title),
                                        id: rows[0].id,
                                        time: rows[0].time,
                                        price: (rows[0].price),
                                        image: "",
                                        user: rows[0].user,
                                    }
                                    res.status(200).json(item);
                                } else
                                    res.status(403).end();
                            });
                        }
                    } else
                        res.status(404).end();
                });

            } else
                res.status(401).end();
        });
        connection.release();
    });

});

function errorMessage(field, message) {
    return [{
        'field': field,
        'message': message
    }];
}




module.exports = router;
