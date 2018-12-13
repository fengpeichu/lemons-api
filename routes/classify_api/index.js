var query = require('../../mysql');
var sql = require('../../mysql/sql');
var uuid = require('uuid');
var iconlist = function(req, res, next) {
    query(sql.SELECT_ICON_LIST, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err })
        } else {
            res.json({ code: 1, msg: result })

        }
    })
}


//查询分类

var getClassify = function(req, res, next) {
    var uid = req.query.uid;
    query(sql.SELECT_CLASSIFY, [uid], function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err })
        } else {
            res.json({ code: 1, msg: result })
        }
    })
}

//添加分类
var addClassify = function(req, res, next) {
    var params = req.body,
        uid = params.uid,
        type = params.type,
        c_name = params.c_name,
        c_icon = params.c_icon;
    if (!uid || !type || !c_name || !c_icon) {
        res.json({ code: 4, msg: '缺少参数' })
    } else {
        isHasClassify();
    }

    function isHasClassify() {
        query(sql.ISHAS_CLASSIFY, [uid, c_name, type], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err });
            } else {
                // res.json({ code: 1, msg: result });
                if (result.length) {
                    res.json({ code: 3, msg: '此分类以存在' })
                } else {
                    addClassify();
                }
            }
        })
    }

    function addClassify() {
        var cid = uuid.v1();
        query(sql.ADD_CLASSIFY, [cid, c_name, c_icon, type, uid], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, msg: '添加成功' })
            }
        })
    }
}






module.exports = {
    iconlist: iconlist,
    getClassify: getClassify,
    addClassify: addClassify
}