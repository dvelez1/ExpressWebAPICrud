const sql = require('mssql/msnodesqlv8')
var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('express');
var queryString = "";

const { response } = require('express');
const router = express.Router()
//msnodesqlv8 module is requiered for Windows Authentication without using Username and Password

// ConnectionString
const pool = new sql.ConnectionPool({
  database: 'Tarea',
  server: 'LENOVO\\SQLEXPRESS',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
})
// Model
var tarea = {Id:0, Nombre:"", Estado:""};


//GET API
app.get("/getTareas", function (request, response) {
  try {
    pool.connect().then(() => {
      //simple query
      queryString = 'select TOP(10) Id,Nombre,Estado  from dbo.Tareas';
      pool.request().query(queryString, (err, result) => {
        if (err){
          console.log(err)
          response.sendStatus(400)
        }
        else {
          console.log("Resultado", result.recordset)
          response.send(result.recordset);
        }
      })
    })
  } catch (err) {
    response.status(500)
    response.send(err.message)
  }
});

// Get/Id

//Post API
app.post("/updateTareas", function (request, response) {
  try {

    tarea.Id = request.body.Id;
    tarea.Estado = request.body.Estado;
    tarea.Nombre = request.body.Nombre;
  
    pool.connect().then(() => {
      //simple query
      queryString = 'Update dbo.Tareas ' + 
      'SET Nombre = @Nombre, Estado = @Estado' +    
      ' WHERE id=@Id';

      pool.request()
      .input("Id", sql.Int, tarea.Id)
      .input("Nombre", sql.VarChar, tarea.Nombre)
      .input("Estado", sql.Bit, tarea.Estado)
      .query(queryString, (err, result) => {
        if (err){
          console.log(err)
          response.sendStatus(400)
        }
        else {
          response.sendStatus(200)
          //response.status(200).send({message: "Success"})
        }
      })
   
    })

  } catch (err) {
    response.status(500)
    response.send(err.message)
  }
});

app.put("/createTareas", function (request, response) {
  try {

    tarea.Id = 0;
    tarea.Estado = request.body.Estado;
    tarea.Nombre = request.body.Nombre;
    
    pool.connect().then(() => {
      //simple query
      queryString = 'Insert Into dbo.Tareas(Nombre, Estado) ' + 
      'VALUES(@Nombre, @Estado)';

      pool.request()
      .input("Nombre", sql.VarChar, tarea.Nombre)
      .input("Estado", sql.Bit, tarea.Estado)
      .query(queryString, (err, result) => {
        if (err){
          console.log(err)
          response.sendStatus(400)
        }
        else {
          response.sendStatus(200)
        }
      })
   
    })

  } catch (err) {
    response.status(500)
    response.send(err.message)
  }
});


var server = app.listen(5000, function () {
  console.log('Node server is running..');
});