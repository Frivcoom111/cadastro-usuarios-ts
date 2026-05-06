import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users.service";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.findAll();

            res.status(200).json({ message: "Usuário listados com sucesso.", users })
        } catch (error) {
            next(error);
        }
    }
}