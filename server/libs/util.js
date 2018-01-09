'use strict'

const fs=require('fs');
const xml2js = require('xml2js')
const tpl = require('./tpl')

exports.readFileAsync = function(fpath,encoding){
  return new Promise(function(resolve,reject){
    fs.readFile(fpath,encoding,function(err,content){
      if(err){reject(err)}
      else{ resolve(content)}
    })
  })
}

exports.writeFileAsync = function(fpath,content){
  return new Promise(function(resolve,reject){
    fs.writeFile(fpath,content,function(err){
      if(err){reject(err)}
      else{ resolve()}
    })
  })
}

exports.tpl = function(content,message){
  let info = {},
      type = 'text',
      fromUserName = message.FromUserName,
      toUserName = message.ToUserName

  if(Array.isArray(content)){
    type = 'news'
  }

  type = content.type||type
  info.content = content
  info.createTime = new Date().getTime()
  info.msgType = type
  info.toUserName = fromUserName
  info.fromUserName = toUserName

  const xml2js = require('xml2js')
  let build = new xml2js.Builder({
    // rootName:'xml',
    // cdata:true
  })
  return build.buildObject({
    xml:info
  })

  // return tpl.compiled(info)
}