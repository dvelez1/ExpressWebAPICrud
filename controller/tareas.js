const sql = require('mssql/msnodesqlv8') 
var express = require('express');
var app = express();
app.use(express.json());
var queryString = "";
const dbConfig = require("../dbConnection")


const pool =  dbConfig.getConnection();

exports.getTareas =  (request, response) => {
    try {
      console.log("entre")
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
  };


  exports.getTareasById =  (request, response) =>{
    try {
      pool.connect().then(() => {
        //simple 
        const id = parseInt(request.params.Id);
  
        queryString = 'select TOP(10) Id,Nombre,Estado  from dbo.Tareas where Id=@Id';
        pool.request()
        .input("Id", sql.Int, id)
        .query(queryString, (err, result) => {
          if (err){
            console.log(err)
            response.sendStatus(400)
          }
          else {
            response.send(result.recordset);
          }
        })
      })
    } catch (err) {
      response.status(500)
      response.send(err.message)
    }
  };