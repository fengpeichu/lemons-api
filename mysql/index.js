/*
 * @Author: 楚凤沛 
 * @Date: 2018-12-11 15:57:03 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-12 11:08:50
 */
var pool = require('mysql').createPool({
    connectionLimit: 100,
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'lemon'
});


module.exports = function(sql, arr, ck) {
    ck = ck ? ck : arr;
    arr = arr || [];
    pool.getConnection(function(err, con) {
        if (err) {
            return ck && ck(err);
        }
        con.query(sql, arr, function(err, result, filed) {
            if (err) {
                return ck && ck(err);
            }
            ck && ck(null, result, filed);
            con.release();
        })
    })
}