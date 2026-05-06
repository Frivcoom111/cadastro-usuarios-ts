import express from "express";
import { UserController } from "../controllers/users.controller";

const routes = express.Router();
const userController = new UserController();

routes.get("/", userController.findAll.bind(userController));


export default routes;