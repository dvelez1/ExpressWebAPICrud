module.exports = app => {
    const tareas = require("../controller/tareas");
    var router = require("express").Router();
    router.get("/getTareas", tareas.getTareas);

    router.get("/getTareasById/:Id", tareas.getTareasById);
    // app.use('/api/tareas', router);
    app.use('', router);

  };
