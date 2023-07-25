import express from "express";
import updateUser from "../controllers/updateUser.js";

const updateUserRouter = express.Router();
updateUserRouter.put("/", updateUser);
export default updateUserRouter;
