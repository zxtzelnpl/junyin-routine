'use strict'

const fs=require('fs');
const xml2js = require('xml2js')

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

exports.jsonToXml = (obj) => {
  const builder = new xml2js.Builder()
  return builder.buildObject(obj)
}