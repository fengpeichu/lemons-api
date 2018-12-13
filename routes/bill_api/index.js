var query = require('../../mysql');
var sql = require('../../mysql/sql');
var uuid = require('uuid');
var addBill = function(req, res, next) {
    var params = req.body,
        uid = params.uid,
        timer = params.timer,
        cid = params.cid,
        money = params.money;
    if (!uid || !timer || !cid || !money) {
        res.json({ code: 4, msg: '丢失参数' })
    } else {
        var lid = uuid.v1();
        // lid,uid,cid,timer,money
        query(sql.ADD_BILL, [lid, uid, cid, timer, money], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err });
            } else {
                res.json({ code: 1, msg: '添加成功' })
            }
        })
    }
}

var getBill = function(req, res, next) {
    var uid = req.query.uid,
        timer = req.query.timer,
        time_type = req.query.time_type, //1：年    2018   2  月   2018-12
        classify = req.query.classify; //["购物“，"买东西"".....]
    console.log(classify);
    if (!uid || !timer) {
        res.json({ code: 4, msg: "丢失参数" });
    } else {
        var sqlStr;
        if (classify) {
            classify = JSON.parse(classify);
            var target = [];
            classify.forEach(function(item) {
                target.push(decodeURI(item));
            })
            sqlStr = time_type === 1 ? sql.SELECT_YEAR_BILL : sql.SELECT_MONTH_BILL;
        } else {
            sqlStr = time_type === 1 ? sql.SELECT_YEAR_BILL : sql.SELECT_MONTH_BILL;
        }

        selectBill(sqlStr, target);
    }

    function selectBill(sqlStr, target) {
        query(sqlStr, [uid, timer, , target], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err });
            } else {
                res.json({ code: 1, data: result });
            }
        })
    }

};

var delBill = function(req, res, next) {
    var lid = req.query.lid;
    if (!lid) {
        res.json({ code: 4, msg: "缺少参数" });
    } else {
        query(sql.DELETE_BILL, [lid], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err });
            } else {
                res.json({ code: 1, msg: "删除成功" });
            }
        })
    }
}
module.exports = {
    addBill: addBill,
    getBill: getBill,
    delBill: delBill
}