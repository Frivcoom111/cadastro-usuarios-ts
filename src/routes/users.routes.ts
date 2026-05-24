import express from "express"
import { UserController } from "../controllers/users.controller"

const routes = express.Router()
const userController = new UserController()

routes.get("/", userController.findAll.bind(userController))
routes.get("/:id", userController.findById.bind(userController))
routes.post("/", userController.create.bind(userController))
routes.patch("/", userController.update.bind(userController))
routes.delete("/", userController.delete.bind(userController))

export default routes
