const indexController = require("../controller/indexcontroller");
const {jwtMiddleware} = require("../../jwtMiddleware");
exports.indexRouter = function(app){
    // 일정 CRUD API
    
    //creat
    app.post("/todo",jwtMiddleware,indexController.createTodo)

    //Read /user/1/todos 
    app.get("/todos",jwtMiddleware,indexController.readTodo);

    //update 
    app.patch("/todo",jwtMiddleware,indexController.updateTodo);

    //delete  /user/1/todo/1 1번유저가 1번 todo 삭제
    app.delete("/todo/:todoIdx",jwtMiddleware, indexController.deleteTodo);

    app.get(
        "/dummy",
        function (req, res, next) {
          console.log(1);
          next();
        },
        function (req, res, next) {
          console.log(2);
          next();
        },
        function (req, res) {
          console.log(3);
        }
      );
};