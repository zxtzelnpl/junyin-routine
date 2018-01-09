'use strict'

const sha1 = require('sha1')
const request = require('request-promise-native');
const config = require('../config/wechat')
const prefix = 'https://api.weixin.qq.com/cgi-bin/'// url前缀
const api = {
  // 全局票据
  accessToken: `${prefix}token?grant_type=client_credential`,// access_token获取
  // js-sdk的临时票据
  jsapiTicket:`${prefix}ticket/getticket?`, // jsapi_ticket获取
  // 自定义菜单
  menu:{
    create:`${prefix}menu/create?`,// 自定义菜单创建
    get:`${prefix}menu/get?`,// 自定义菜单查询
    delete:`${prefix}menu/delete?`,// 自定义菜单删除
    addconditional:`${prefix}menu/addconditional?`,// 创建个性化菜单
    delconditional:`${prefix}menu/delconditional?`,// 删除个性化菜单
    trymatch:`${prefix}menu/trymatch?`,// 测试个性化菜单匹配结果
    getCurrent:`${prefix}get_current_selfmenu_info?`,// 获取自定义菜单配置
  }

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

export async function WeChat () {
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