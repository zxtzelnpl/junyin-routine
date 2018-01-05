const path = require('path')
const Koa = require('koa')
const mysql = require('mysql')
const serve = require('koa-better-serve')
const session = require('koa-session')
const favicon = require('koa-favicon')

const mysql_config = require('./server/config/mysql')
const app = new Koa()
const router = require('./server/router')

/**定义常量**/
const port = process.env.PORT || 3000
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
}

const connection = mysql.createConnection(mysql_config)
connection.connect()

app
    .use(async (ctx,next) => {
      console.log('begin')
      ctx.connection = connection
      await next()
      console.log('end')
    })
    .use(inner1)
    .use(session(CONFIG, app))
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






