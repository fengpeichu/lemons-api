var query = require('../../mysql'); //逻辑
var sql = require('../../mysql/sql'); //sql语句
var uuid = require('uuid');
//添加用户名
var addUser = function(req, res, next) {
    var uid = uuid.v1();
    var nick_name = req.body.nick_name || null; //get获取传参的方式
    query(sql.ADD_USER, [uid, nick_name], function(err, result) {
        if (err) {
            res.json({ code: 0, msg: error })
        } else {
            res.json({ code: 1, msg: '添加成功', uid: uid })
        }
    })
}
module.exports = {
    addUser: addUser
}