import express from "express";
import createUser from "../controllers/signup.js";

const signupRouter = express.Router();
signupRouter.post("/", createUser);

export default signupRouter;
