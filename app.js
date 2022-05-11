const sql = require('mssql/msnodesqlv8')
var express = require('express');
var app = express();

//msnodesqlv8 module is requiered for Windows Authentication without using Username and Password


const pool = new sql.ConnectionPool({
  database: 'Tarea',
  server: 'LENOVO\\SQLEXPRESS',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
})



//GET API
app.get("/tareas", function(req , res){
	pool.connect().then(() => {
        //simple query
        var queryString = 'select TOP(1) Id,Nombre,Estado  from dbo.Tareas';
        pool.request().query(queryString, (err, result) => {
          if(err)
          console.log(err)
          else {
              console.log("Resultado",result)
              res.send(result);
          }
          })
      })
});
// function getTareas() {
// pool.connect().then(() => {
//   //simple query
//   var queryString = 'select TOP(1) Id,Nombre,Estado  from dbo.Tareas';
//   pool.request().query(queryString, (err, result) => {
//     if(err)
//     console.log(err)
//     else {
//         console.log("Resultado",result)
//         res.send(result);
//     }
//     })
// })
// }


var server = app.listen(5000, function () {
    console.log('Node server is running..');
});