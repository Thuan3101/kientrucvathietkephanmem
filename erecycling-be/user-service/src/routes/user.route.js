const { Router } = require("express");
const AuthController = require("./../controller/auth.controller")
const userRouter = Router();
const AuthMiddleware = require("./middleware/auth")
userRouter.get("/whoami", (req, res, err) => {
  return res.json({
    status: 200,
    message: "Hello from user service!",
  });
});


userRouter.post("/register", AuthController.register);
userRouter.post("/login", AuthController.login);
userRouter.get("/getMe", AuthMiddleware.protectApi, AuthController.getMe)
module.exports = userRouter;
