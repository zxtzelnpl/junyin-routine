'use strict'

const sha1 = require('sha1')
const request = require('request-promise-native');
const config = require('../config/wechat')
const prefix = 'https://api.weixin.qq.com/cgi-bin/token?'
const api = {
  accessToken: prefix + 'grant_type=client_credential'
}

function Wechat (opts) {
  this.appID = opts.appID
  this.appSecret = opts.appSecret
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken
}

Wechat.prototype.isValidAccessToken = function (data) {
  if (!data || !data.access_token || !data.expires_in) {
    return false
  }
  let expires_in = data.expires_in
  let now = (new Date().getTime())
  return now < expires_in;
}

Wechat.prototype.updateAccessToken = async function () {
  let appID = this.appID
  let appSecret = this.appSecret
  let url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret
  let response = await request({url: url, json: true})//{ errcode: 40164, errmsg: 'invalid ip 101.81.67.16, not in whitelist hint: [vEJBZa04161512]' }
  console.log(response)
  let data = response
  let now = (new Date()).getTime()
  data.expires_in = now + (data.expires_in - 20) * 1000
  return data
}

Wechat.prototype.getAccessToken = config.getAccessToken

Wechat.prototype.saveAccessToken = config.saveAccessToken


exports.g = async function (ctx) {
  let wechat = new Wechat(config)
  try {
    let file = await wechat.getAccessToken()
    let data = JSON.parse(file)
    if (!wechat.isValidAccessToken(data)) {
      data = await wechat.updateAccessToken()
    }
    wechat.access_token = data.access_token
    wechat.expires_in = data.expires_in
    await wechat.saveAccessToken(data)
  }
  catch (e) {
    let data = await wechat.updateAccessToken()
    wechat.access_token = data.access_token
    wechat.expires_in = data.expires_in
    await wechat.saveAccessToken(data)
  }

  let token = config.token
  let nonce = ctx.query.nonce
  let timestamp = ctx.query.timestamp
  let signature = ctx.query.signature
  let echostr = ctx.query.echostr

  let str = [token, timestamp, nonce].sort().join('')

  let sha = sha1(str)

  if (sha === signature) {
    ctx.body = echostr
  }
  else {
    ctx.body = 'wrong'
  }
}

exports.check = async (ctx,next) =>{
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

exports.accessToken = async () => {
  let wechat = new Wechat(config)
  try {
    console.log('get the accesstoken')
    let file = await wechat.getAccessToken()
    let data = JSON.parse(file)
    if (!wechat.isValidAccessToken(data)) {
      console.log('accesstoken is expire')
      data = await wechat.updateAccessToken()
    }
    wechat.access_token = data.access_token
    wechat.expires_in = data.expires_in
    await wechat.saveAccessToken(data)
  }
  catch (e) {
    console.log('get the accesstoken fail')
    let data = await wechat.updateAccessToken()
    wechat.access_token = data.access_token
    wechat.expires_in = data.expires_in
    await wechat.saveAccessToken(data)
  }
  return wechat
}