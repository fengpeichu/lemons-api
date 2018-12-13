var express = require('express');
var router = express.Router();
var userApi = require('./users_api');
/* GET users listing. */
//添加账单
router.post('/api/addUser', userApi.addUser);
module.exports = router;