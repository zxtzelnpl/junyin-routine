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

const connection = mysql.createConnection(mysql_config);
connection.connect();


app
    .use(async (ctx,next) => {
      console.log('begin')
      ctx.connection = connection
      await next()
      console.log('end')
    })
    .use(session(CONFIG, app))
    .use(favicon(__dirname + '/favicon.ico'))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(path.join(__dirname, './src'), '/src'))

app.listen(port, () => {
  console.log(`listen on ${port}`)
});






