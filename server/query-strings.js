exports.string1 =  function (time) {
    return `SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "腾讯-阻击一号" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL 
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "腾讯-抢先发布" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "腾讯-事件驱动" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "腾讯-量价赢家" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-阻击一号" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-抢先发布" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-事件驱动" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-量价赢家" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "腾讯-我要牛股" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "超级投顾PC端" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "腾讯-聊天页面" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "个人微信号一" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "财富大讲堂PC端" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "腾讯PC端" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-聊天页面" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-在线诊股" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-易文斌" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-刘哲" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-吕向召" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-吴伟伟" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-陈锐" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-群发" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "超级投顾订阅号" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-福利" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "腾讯-福利" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "阿财-黄金一刻" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "微信群发" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL) UNION ALL
    SELECT channel, wx_user_openid FROM wx_user_info WHERE channel = "春节砸蛋" AND updated_at BETWEEN "${time} 00:00:00" AND "${time} 23:59:59" AND wx_user_openid NOT IN (SELECT openid FROM t_user WHERE openid IS NOT NULL);`
}

exports.string2 =  function (time){
    return `SELECT COUNT(DISTINCT openid) FROM t_user WHERE create_time < "${time} 00:00:00";`
}

exports.string3= function (time){
    return `SELECT COUNT(DISTINCT openid) FROM t_user WHERE create_time < "${time} 00:00:00" AND openid IN (SELECT wx_user_openid FROM wx_user_info WHERE subscribe != 0);`
}
