const xml2js = require('xml2js')
let build = new xml2js.Builder({
  // rootName:'xml',
  cdata:false
})
console.log(build.buildObject({xml:{
  'name':'zxg',
  'age':19
}}))
