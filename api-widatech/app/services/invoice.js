const db = require("../config/db.config.js");

exports.getAll = (req, res) => {
    const sqlQuery = "SELECT * FROM invoice";
    db.query(sqlQuery, function (err, results) {
        if (results.length > 0) {
            res.json({
                status: 200,
                payload: results,
                message: "ok",
            });
        } else {
            res.json({
                status: 400,
                payload: results,
                message: "bad",
            });
        }
    });
};

exports.getById = (req, res) => {
    const id = req.params.id;
    const sqlQuery = `SELECT * FROM contact WHERE id = '${id}'`;
    db.query(sqlQuery, function (err, results) {
        if (results.length > 0) {
            res.json({
                status: 200,
                payload: results,
                message: "ok",
            });
        } else {
            res.json({
                status: 400,
                payload: results,
                message: "bad",
            });
        }
    });
};

exports.add = (req, res) => {
    const sqlQuery = `INSERT INTO contact SET fullname = '${req.body.fullname}', phone = ${req.body.phone} ,note = '${req.body.note}'`;
    db.query(sqlQuery, function (err, results) {
        if (results) {
            res.json({
                status: 200,
                payload: results,
                message: "ok",
            });
        } else {
            res.json({
                status: 400,
                payload: results,
                message: "bad",
            });
        }
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const sqlQuery = `UPDATE contact SET fullname = '${req.body.fullname}', phone = ${req.body.phone} ,note = '${req.body.note} where id = '${id}'`;
    db.query(sqlQuery, function (err, results) {
        if (results) {
            res.json({
                status: 200,
                payload: results,
                message: "ok",
            });
        } else {
            res.json({
                status: 400,
                payload: results,
                message: "bad",
            });
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    const sqlQuery = `DELETE FROM contact WHERE id = '${id}'`;
    db.query(sqlQuery, function (err, results) {
        if (results.affectedRows > 0) {
            res.json({
                status: 200,
                payload: results,
                message: "ok",
            });
        } else {
            res.json({
                status: 400,
                payload: results,
                message: "bad",
            });
        }
    });
};
