module.exports = {
    //添加用户
    'ADD_USER': 'insert into user_list(uid,nick_name) values(?,?)',
    //查询分类图标
    'SELECT_ICON_LIST': 'select * from iconlist',
    //查询分类
    'SELECT_CLASSIFY': 'select * from classify where (uid=? or uid=*)',
    //添加分类
    'ADD_CLASSIFY': 'insert into classify(cid,c_name,c_icon,type,uid) values(?,?,?,?,?)',
    //查询分类是否存在
    'ISHAS_CLASSIFY': 'select * from classify where (uid=? or uid="*") and c_name=? and type=?',
    //添加账单   lid   谁（uid）在什么时间（timer）干什么（cid）支出/收入（type）多少钱（money）
    'ADD_BILL': 'insert into bill_list(lid,uid,cid,timer,money) values(?,?,?,?,?)',
    //查询年月账单
    'SELECT_MONTH_BILL': "select b.*,c.c_name,c_icon,type from bill_list b,classify c,user_list u where b.uid=? and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y-%m')=?",
    // 'SELECT_BILL': "b.*,c.c_name,c_icon,type from bill_list b,classify c,user_list u where b.uid=? and b.uid=u.uid and b.cid=c.cid"
    //查询年账单
    'SELECT_YEAR_BILL': "select b.*,c.c_name,c_icon,type from bill_list b,classify c,user_list u where b.uid=? and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y')=? ",
    //按年+分类查询账单
    'SELECT_YEAR_CBILL': "select b.*,c.c_name,c_icon,type from bill_list b,classify c,user_list u where b.uid=? and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y')=? and c.c_name in (?)",
    //按月+分类账单
    'SELECT_MONTH_CBILL': "select b.*,c.c_name,c_icon,type from bill_list b,classify c,user_list u where b.uid=? and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y-%m')=? and c.c_name in (?)",
    //删除账单
    'DELETE_BILL': 'delete from bill_list where lid=?'
}