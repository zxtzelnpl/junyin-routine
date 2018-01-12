'use strict'

const request = require('request-promise-native')
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

function Wechat () {
  this.appID = config.appID
  this.appSecret = config.appSecret
  this.getAccessToken = config.getAccessToken
  this.saveAccessToken = config.saveAccessToken
}

Wechat.prototype.isValidAccessToken = function (data) {
  console.log('###isValidAccessToken###')
  console.log(data)
  if (!data || !data.access_token || !data.expires_in) {
    return false
  }
  let expires_in = parseInt(data.expires_in)
  let now = (new Date().getTime())
  return now < expires_in;
}

Wechat.prototype.updateAccessToken = async function () {
  let appID = this.appID
  let appSecret = this.appSecret
  let url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret
  let response = await request({url: url, json: true})
  console.log('##updateAccessToken##')
  console.log(response)
  console.log('##updateAccessToken##')
  let data = response
  let now = (new Date()).getTime()
  data.expires_in = now + (data.expires_in - 20) * 1000
  return data
}

Wechat.prototype.createMenu = async function (menu){
  /**这边需要做更改**/
  let accessToken = await this.getAccessToken()
  if(!this.isValidAccessToken(accessToken)){
    accessToken = await this.updateAccessToken()
    await this.saveAccessToken(accessToken)
  }
  /**这边需要做更改**/
  let url = `${api.menu.create}access_token=${accessToken.access_token}`
  let response = await request({method:'POST',body:menu,url:url,json:true})
  console.log(response)
  return response
}

Wechat.prototype.getMenu = async function (){
  /**这边需要做更改**/
  let accessToken = await this.getAccessToken()

  console.log('##getMenu##')
  console.log(accessToken)
  console.log('##getMenu##')

  if(!this.isValidAccessToken(accessToken)){
    accessToken = await this.updateAccessToken()
    await this.saveAccessToken(accessToken)
  }

  console.log('##getMenu##')
  console.log(accessToken)
  console.log('##getMenu##')
  /**这边需要做更改**/
  let url = `${api.menu.get}access_token=${accessToken.access_token}`

  console.log(url)
  let response = await request({method:'GET',url:url,json:true})
  console.log(response)
  return response
}

Wechat.prototype.deleteMenu = async function (){
  /**这边需要做更改**/
  let accessToken = await this.getAccessToken()
  if(!this.isValidAccessToken(accessToken)){
    accessToken = await this.updateAccessToken()
    await this.saveAccessToken(accessToken)
  }
  /**这边需要做更改**/
  let url = `${api.menu.delete}access_token=${accessToken.access_token}`
  let response = await request({method:'GET',url:url,json:true})
  console.log(response)
  return response
}

module.exports =  Wechat