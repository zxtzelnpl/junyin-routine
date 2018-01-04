const Router = require('koa-router')
const koaBody = require('koa-body')
const {readFile} = require('../tools/common')
const {string4, string2, string3, orderString} = require('./query-strings')
const router = new Router()
const moment = require('moment')
const Excel = require('exceljs')
const Stream = require('stream')


router.get('/', async (ctx, next) => {
  try {
    let data = await readFile('./src/index.html')
    ctx.response.type = 'html'
    ctx.response.body = data
  }
  catch (err) {
    ctx.body = {message: err.message}
    ctx.status = err.status || 500
  }
})

router.get('/query/:num', async (ctx) => {
  try {
    let num = ctx.params.num
    let connection = ctx.connection
    let arr = []
    for (let i = 1; i <= num; i++) {
      let obj
      let time = moment().subtract(i, 'days').format('YYYY-MM-DD')
      let str1 = string4(time)
      let str2 = string2(time)
      let str3 = string3(time)
      if (i === 1) {
        let results1 = await query(connection, str1)
        let results2 = await query(connection, str2)
        let results3 = await query(connection, str3)
        obj = {
          time,
          results1: results1.length,
          results2: results2[0]["COUNT(DISTINCT openid)"],
          results3: results3[0]["COUNT(DISTINCT openid)"],
        }
      }
      else {
        let results1 = await query(connection, str1)
        obj = {
          time,
          results1: results1.length,
        }
      }

      arr.unshift(obj)
    }
    ctx.body = format_html(arr)
  } catch (err) {
    ctx.body = {message: err.message}
    ctx.status = err.status || 500
  }
})
let n=1;
router.get('/order/:num', async (ctx, next) => {

  console.log(ctx)
  console.log('this is begin'+n)
  console.log(typeof stream)
  n++

  let connection = ctx.connection
  let stream = new Stream.Transform()
  stream._transform = function (chunk,encoding,done)
  {
    this.push(chunk)
    done()
  }
  try {
    let day = ctx.params.num
    let str = orderString(day)
    let results = await query(connection, str)
    let workbook = new Excel.Workbook()

    workbook.creator = 'Me'
    workbook.lastModifiedBy = 'Her'
    workbook.created = new Date(1985, 8, 30)
    workbook.modified = new Date()
    workbook.lastPrinted = new Date(2016, 9, 27)
    workbook.properties.date1904 = true
    workbook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
    ]
    let worksheet = workbook.addWorksheet('订单详情', {properties: {tabColor: {argb: 'FFC0000'}}});
    worksheet.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Name', key: 'name', width: 32},
      {header: 'D.O.B.', key: 'DOB', width: 10}
    ]

    worksheet.addRow({id: 1, name: 'John Doe', DOB: new Date(1970, 1, 1)})
    worksheet.addRow({id: 2, name: 'Jane Doe', DOB: new Date(1965, 1, 7)})
    await workbook.xlsx.write(stream)
    // ctx.set('Content-Type', 'application/vnd.openxmlformats');
    ctx.type = 'application/vnd.openxmlformats'
    ctx.response.attachment("o2olog.xlsx")
    // ctx.set("Content-Disposition", "attachment; filename=" + "o2olog.xlsx");
    ctx.body=stream
    stream.end()
    console.log('this is end')
  }
  catch (err) {
    ctx.body = {message: err.message}
    ctx.status = err.status || 500
  }
})

async function query(connection, str) {
  return new Promise((resolve, reject) => {
    connection.query(str, (error, results, fields) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

function format_html(arr) {
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