const Router = require('koa-router')
const koaBody = require('koa-body')
const {readFile} = require('../tools/common')
const {string4, string2, string3} = require('./query-strings')
const router = new Router()
const moment = require('moment')


router.get('/page', () => {

})

router.get('/query',async (ctx,a) => {
  try {
    console.log(ctx)
    console.log(ctx.connection)
    console.log(a)
    console.log(this)
    // let num = ctx.data.num
    // let arr = []
    // for (let i = 1; i <= num; i++) {
    //   let obj
    //   let time = moment().subtract(i, 'days').format('YYYY-MM-DD')
    //   let str1 = string4(time)
    //   let str2 = string2(time)
    //   let str3 = string3(time)
    //   if (i === 1) {
    //     let results1 = await query(connection, str1)
    //     let results2 = await query(connection, str2)
    //     let results3 = await query(connection, str3)
    //     obj = {
    //       time,
    //       results1: results1.length,
    //       results2: results2[0]["COUNT(DISTINCT openid)"],
    //       results3: results3[0]["COUNT(DISTINCT openid)"],
    //     }
    //   }
    //   else {
    //     let results1 = await query(connection, str1)
    //     obj = {
    //       time,
    //       results1: results1.length,
    //     }
    //   }
    //
    //   arr.unshift(obj)
    // }
    // ctx.body = format_html(arr)
    ctx.body = 'Hello world1'
  } catch (err) {
    ctx.body = {message: err.message}
    ctx.status = err.status || 500
  }
})

router.get('/hello',async (ctx, next) => {
  try {
    // if (ctx.request.url === '/favicon.ico') {
    //   return ctx.body = 'no favicon'
    // }
    // if (ctx.request.url.indexOf('/query') > -1) {
    //   let reg = /\/query\/([0-9])/i
    //   let results = reg.exec(ctx.request.url)
    //   let num = results ? parseInt(results[1]) : 1
    //   ctx.data = {
    //     num: num
    //   }
    //   ctx.body = 'Hello world'
    //   return await next();
    // }
    ctx.body = 'Hello world'
  } catch (err) {
    ctx.body = {message: err.message}
    ctx.status = err.status || 500
  }
})

router.get('/',async (ctx ,next) =>{
  try{
    let data = await readFile('./src/index.html')
    ctx.response.type='html'
    ctx.response.body = data
  }
  catch(err){
    ctx.body = {message: err.message}
    ctx.status = err.status || 500
  }
})

async function query (connection, str) {
  return new Promise((resolve, reject) => {
    connection.query(str, (error, results, fields) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

function format_html (arr) {
  let strArr = arr.map((item, index) => {
    if (item.results2) {
      return `时间： ${item.time} | 新关注： ${item.results1} | 总注册： ${item.results2} | 注册未取消关注： ${item.results3}`
    }
    else {
      return `时间： ${item.time} | 新关注： ${item.results1} `
    }
  })
  return strArr.join('\n')
}

module.exports = router