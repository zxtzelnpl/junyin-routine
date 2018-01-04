const fs = require('fs')

exports.readFile = function (src){
  return new Promise((resolve,reject)=>{
    fs.readFile(src,(err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}