#!/usr/bin/env node

'use strict'

const path = require('path')
const Koa = require('koa')
const mysql = require('mysql')
const serve = require('koa-better-serve')
const session = require('koa-session')
const favicon = require('koa-favicon')

/**引用router**/
const router = require('./server/router')
const WeChat = require('./server/wechat')

/**引用config**/
const mysqlConfig = require('./server/config/mysql')
const sessionConfig = require('./server/config/session')

/**定义常量**/
const port = process.env.PORT || 3000
const connection = mysql.createConnection(mysqlConfig)
connection.connect()

/**生成app实例**/
const app = new Koa()
app.context.connection = connection
app.context.wechat = new WeChat()

app
    .use(session(sessionConfig, app))
    .use(favicon(__dirname + '/favicon.ico'))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(path.join(__dirname, './src'), '/src'))


app.listen(port, () => {
  console.log(`listen on ${port}`)
});






