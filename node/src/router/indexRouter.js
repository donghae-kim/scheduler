const indexController = require("../controller/indexcontroller");

exports.indexRouter = function(app){
    // 일정 CRUD API
    
    //creat
    app.post("/todo", indexController.createTodo)

    //Read /user/1/todos 
    app.get("/user/:userIdx/todos",indexController.readTodo);
};