'use strict'

const path = require('path')
const Koa = require('koa')
const mysql = require('mysql')
const serve = require('koa-better-serve')
const session = require('koa-session')
const favicon = require('koa-favicon')

/**引用router**/
const router = require('./server/router')
const mysqlConfig = require('./server/config/mysql')
const sessionConfig = require('./server/config/session')

/**定义常量**/
const port = process.env.PORT || 3000
const connection = mysql.createConnection(mysqlConfig)
connection.connect()


const app = new Koa()
app
    .use(async (ctx,next) => {
      console.log('begin')
      ctx.connection = connection
      await next()
      console.log('end')
    })
    .use(inner1)
    .use(session(sessionConfig, app))
    .use(inner2)
    .use(favicon(__dirname + '/favicon.ico'))
    .use(inner3)
    .use(router.routes())
    .use(inner4)
    .use(router.allowedMethods())
    .use(inner5)
    .use(serve(path.join(__dirname, './src'), '/src'))
    .use(inner6)


app.listen(port, () => {
  console.log(`listen on ${port}`)
});


async function inner1(ctx,next){
  console.log('inner1 begin')
  await next()
  console.log('inner1 end')
}
async function inner2(ctx,next){
  console.log('inner2 begin')
  await next()
  console.log('inner2 end')
}
async function inner3(ctx,next){
  console.log('inner3 begin')
  await next()
  console.log('inner3 end')
}
async function inner4(ctx,next){
  console.log('inner4 begin')
  await next()
  console.log('inner4 end')
}
async function inner5(ctx,next){
  console.log('inner5 begin')
  await next()
  console.log('inner5 end')
}
async function inner6(ctx,next){
  console.log('inner6 begin')
  ctx.body='inner6'
  console.log('inner6 end')
}






