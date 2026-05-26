import type { NextFunction, Request, Response } from "express"
import { UserService } from "../services/users.service"
import {
  createUserSchema,
  type ICreateUserInput,
  type IdParamsInput,
  type IUpdateUserInput,
  idParams,
  updateUserSchema,
} from "../validators/usersValidators"

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findAll()

      res.status(200).json({ message: "Usuários listados com sucesso.", users })
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const validation: IdParamsInput = idParams.parse({ id: req.params.id })

      const user = await this.userService.findById(validation.id)

      res.status(200).json({ message: "Usuário encontrado com sucesso.", user })
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ICreateUserInput = createUserSchema.parse(req.body)

      const userCreated = await this.userService.create(data)

      res.status(201).json({ message: "Usuário criado com sucesso.", user: userCreated })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validation: IdParamsInput = idParams.parse({ id: req.params.id })
      const data: IUpdateUserInput = updateUserSchema.parse(req.body)

      const updatedUser = await this.userService.update(validation.id, data)

      res.status(200).json({ message: "Usuário atualizado com sucesso.", user: updatedUser })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = idParams.parse({ id: req.params.id })

      await this.userService.delete(validation.id)

      res.status(200).json({ message: "Usuário deletado com sucesso." })
    } catch (error) {
      next(error)
    }
  }
}
