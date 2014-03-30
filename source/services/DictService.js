var settings = require('../../settings');
var logger = require('../commons/logging').logger;
var pool = require("../commons/mysql");

var Service = {};
Service.listTargets = function(callback) {
    console.info('listing targets');
    pool.getConnection(function(err, connection) {
        connection.query('SELECT id, name from targets order by displayorder', function(err, rows, fields) {
            if(err){
                callback(err, null);
                return;
            }
            callback(null, rows);
            connection.release();
        });
    });
};
module.exports = Service;