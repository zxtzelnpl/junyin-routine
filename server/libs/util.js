'use strict'

const fs=require('fs');
const xml2js = require('xml2js')
let build = new xml2js.Builder({
  rootName:'xml',
  cdata:false
})

exports.readFileAsync = function(fpath,encoding){
  return new Promise(function(resolve,reject){
    fs.readFile(fpath,encoding,function(err,content){
      if(err){reject(err)}
      else{
        console.log('##readFileAsync##')
        console.log(content)
        console.log('##readFileAsync##')
        resolve(content)
      }
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
      type = 'text'
  if(Array.isArray(content)){
    type = 'news'
  }

  type = content.type||type
  info.Content = content
  info.CreateTime = new Date().getTime()
  info.MsgType = type
  info.ToUserName = message.FromUserName
  info.FromUserName = message.ToUserName

  return build.buildObject(info)
}