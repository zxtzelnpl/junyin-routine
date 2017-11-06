let str = '/query/0'

let reg = /\/query\/([0-9])/i

let results = reg.exec(str)
console.log(results)