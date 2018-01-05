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
router.get('/order/:num',koaBody(), async (ctx, next) => {

  console.log('this is begin')

  let connection = ctx.connection
  let stream = new Stream.Transform()
  stream._transform = function (chunk, encoding, done) {
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
    let worksheet = workbook.addWorksheet('订单列表', {properties: {tabColor: {argb: 'FFC0000'}}});
    worksheet.columns = [
      {header: '渠道', key: 'channel', width: 15},
      {header: '下单时间', key: 'create_time', width: 18},
      {header: '交易时间', key: 'pay_time', width: 18},
      {header: '下单人', key: 'user_name', width: 12},
      {header: '手机号', key: 'user_phone', width: 12},
      {header: '商品名称', key: 'produce_name', width: 10},
      {header: '商品类型', key: 'type', width: 10},
      {header: '订阅期数', key: 'periods', width: 10},
      {header: '订单金额', key: 'account_money', width: 10},
      {header: '订阅状态', key: 'subscribe_status', width: 10},
      {header: '订单状态', key: 'order_status', width: 10},
      {header: '备注', key: 'remark', width: 10},
    ]

    results.forEach(result => {
      let {channel,create_time, pay_time, user_name, user_phone, produce_name, type, periods, account_money, subscribe_status, order_status, remark} = result
      let typeName,subscribeStatusName
      if (type === 1){
        typeName = '投资锦囊'
      }
      if(subscribe_status===1){
        subscribeStatusName='正常'
      }
      worksheet.addRow({
        channel:channel,
        create_time: moment(create_time).format('YYYY-MM-DD HH:mm'),
        pay_time: moment(pay_time).format('YYYY-MM-DD HH:mm'),
        user_name: user_name,
        user_phone: user_phone,
        produce_name: produce_name,
        type: typeName,
        periods: periods,
        account_money: account_money,
        subscribe_status: subscribeStatusName,
        order_status: '支付成功',
        remark: remark
      })
    })

    await workbook.xlsx.write(stream)
    ctx.type = 'application/vnd.openxmlformats'
    ctx.attachment(`${moment().subtract(1,'days').format('YYYY年MM月DD日订单信息')}.xlsx`)
    stream.end()
    ctx.body = stream
    console.log('this is end')
  }
  catch (err) {
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