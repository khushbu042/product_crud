const express = require("express");
const userRouter = express.Router();
const {signUp, login, logout, isLoggedIn} = require("../controllers/user.controller.js")


userRouter.post("/register", signUp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/isloggedin",isLoggedIn);

module.exports = userRouter;