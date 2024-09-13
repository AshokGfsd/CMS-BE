const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/profile", auth.verifyToken, userController.getProfile);
userRouter.put("/forgot", userController.forgot);
userRouter.post("/verify/", userController.verify);
userRouter.put("/reset/", userController.reset);
userRouter.put("/update", auth.verifyToken, userController.update);

module.exports = userRouter;
