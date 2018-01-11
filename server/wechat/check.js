'use strict'
const sha1 = require('sha1')
const config = require('../config/wechat')

module.exports = async (ctx,next) =>{
  let token = config.token
  let nonce = ctx.query.nonce
  let timestamp = ctx.query.timestamp
  let signature = ctx.query.signature
  let echostr = ctx.query.echostr

  let str = [token, timestamp, nonce].sort().join('')

  let sha = sha1(str)

  if (sha !== signature) {
    ctx.body = 'wrong'
  }
  else if(ctx.method === 'GET'){
    console.log('get method and weixin check path')
    ctx.body = echostr
  }
  else {
    console.log('post method and weixin check path')
    await next()
  }
}