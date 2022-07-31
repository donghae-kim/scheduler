const userController = require("../controller/userController");
const {jwtMiddleware} = require("../../jwtMiddleware");

exports.userRouter = function(app){
    //회원가입 api
    app.post("/user",userController.signup);

    //로그인 api
    app.post("/sign-in",userController.signin);
};