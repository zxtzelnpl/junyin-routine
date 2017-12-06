const Koa = require('koa')
const mysql = require('mysql')
const moment = require('moment')
const {string4,string2,string3} = require('./server/query-strings')
const mysql_config = require('./server/config/mysql')
const app = new Koa()

/**定义常量**/
const port = process.env.PORT || 3000

const connection = mysql.createConnection(mysql_config);
connection.connect();

app.use(async(ctx,next) => {
    try {
        if(ctx.request.url === '/favicon.ico'){
            return ctx.body = 'no favicon'
        }
        if(ctx.request.url.indexOf('/query')>-1){
            let reg = /\/query\/([0-9])/i
            let results = reg.exec(ctx.request.url)
            let num = results?parseInt(results[1]):1
            ctx.data = {
                num:num
            }
            ctx.body = 'Hello world'
            return await next();
        }
        ctx.body = 'Hello world'
    } catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
    }
})


app.use(async(ctx) => {
    try{
        let num = ctx.data.num
        let arr = []
        for(let i=1;i<=num;i++){
            let obj
            let time = moment().subtract(i,'days').format('YYYY-MM-DD')
            let str1 = string4(time)
            let str2 = string2(time)
            let str3 = string3(time)
            if(i===1){
                let results1 =await query(connection,str1)
                let results2 =await query(connection,str2)
                let results3 =await query(connection,str3)
                obj = {
                    time,
                    results1:results1.length,
                    results2:results2[0]["COUNT(DISTINCT openid)"],
                    results3:results3[0]["COUNT(DISTINCT openid)"],
                }
            }
            else{
                let results1 =await query(connection,str1)
                obj = {
                    time,
                    results1:results1.length,
                }
            }

            arr.unshift(obj)
        }
        ctx.body = format_html(arr)

    }catch(err){
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
    }
})

app.listen(port,()=>{console.log(`listen on ${port}`)});


async function query(connection,str){
    return new Promise((resolve,reject)=>{
        connection.query(str,(error, results, fields)=>{
            if(error){reject(error)}
            resolve(results)
        })
    })
}

function format_html(arr){
    let strArr=arr.map((item,index)=>{
        if(item.results2){
            return `时间： ${item.time} | 新关注： ${item.results1} | 总注册： ${item.results2} | 注册未取消关注： ${item.results3}`
        }
        else{
            return `时间： ${item.time} | 新关注： ${item.results1} `
        }
    })
    return strArr.join('\n')
}