const Excel = require('exceljs');

function getFun(obj){
  for(var key in obj){
    if(typeof obj[key] === 'function'){
      console.log(key)
    }
  }
}

var workbook = new Excel.Workbook();
workbook.xlsx.readFile('./abc.xlsx')
  .then(function(worksheet) {
    // use workbook

    var ws = worksheet.getWorksheet();

    var rows = ws.getRow(1)
    rows.eachCell(function(cell,index){
      console.log(index);
      console.log(cell.value);
    })

    var rows = ws.getRow(7)
    rows.eachCell(function(cell,index){
      if(index===5){
        console.log(index);
        console.log(JSON.parse(cell.value));
      }
      else{
        console.log(index);
        console.log(cell.value);
      }

    })
  })
  .catch(error=>{
    console.log(error)
  })

console.log('a')
