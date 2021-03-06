const sql = require('mssql/msnodesqlv8') // Moved to dbConnection
const dbConfig = require("./dbConnection")
var express = require('express');
var app = express();
app.use(express.json());
var queryString = "";


// var bodyParser = require('express');
// const { response } = require('express');
// const router = express.Router()
//msnodesqlv8 module is requiered for Windows Authentication without using Username and Password

// ConnectionString
// const pool = new sql.ConnectionPool({
//   database: 'Tarea',
//   server: 'LENOVO\\SQLEXPRESS',
//   driver: 'msnodesqlv8',
//   options: {
//     trustedConnection: true
//   }
// })

const pool =  dbConfig.getConnection();

// Model
var tarea = {Id:0, Nombre:"", Estado:""};


//GET API
// app.get("/getTareas", function (request, response) {
//   try {
//     pool.connect().then(() => {
//       //simple query
//       queryString = 'select TOP(10) Id,Nombre,Estado  from dbo.Tareas';
//       pool.request().query(queryString, (err, result) => {
//         if (err){
//           console.log(err)
//           response.sendStatus(400)
//         }
//         else {
//           console.log("Resultado", result.recordset)
//           response.send(result.recordset);
//         }
//       })
//     })
//   } catch (err) {
//     response.status(500)
//     response.send(err.message)
//   }
// });



// Get/Id
// app.get("/getTareasById/:Id", function (request, response) {
//   try {
//     pool.connect().then(() => {
//       //simple 
//       const id = parseInt(request.params.Id);

//       queryString = 'select TOP(10) Id,Nombre,Estado  from dbo.Tareas where Id=@Id';
//       pool.request()
//       .input("Id", sql.Int, id)
//       .query(queryString, (err, result) => {
//         if (err){
//           console.log(err)
//           response.sendStatus(400)
//         }
//         else {
//           response.send(result.recordset);
//         }
//       })
//     })
//   } catch (err) {
//     response.status(500)
//     response.send(err.message)
//   }
// });

// Example use route and controller for the first two methods
require("./routes/tareas.routes")(app);

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

// PUT API
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

// Delete API 
app.delete("/deleteTareasById/:Id", function (request, response) {
  try {
    pool.connect().then(() => {
      //simple 
      const id = parseInt(request.params.Id);

      queryString = 'Delete from dbo.Tareas where Id=@Id';
      pool.request()
      .input("Id", sql.Int, id)
      .query(queryString, (err, result) => {
        if (err){
          console.log(err)
          response.sendStatus(500)
        }
        else {
          //response.send(result.recordset);
          response.status(200).json({
            message: "Successfully deleted user"
            });
        }
      })
    })
  } catch (err) {
    response.status(500)
    response.send(err.message)
  }
});


//Serve Server
var server = app.listen(5000, function () {
  console.log('Node server is running..');
});