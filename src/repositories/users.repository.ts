import { Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUsers } from "../interfaces/users.interface";
import { IUsersRepository } from "../interfaces/users.repository.interface";
import { User } from "../entities/users.entity";
import AppDataSource from "../config/database";

export class UserRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findAll(): Promise<IUsers[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<IUsers | null> {
        return this.repository.findOne({ where: { id } });
    }

    async create(data: ICreateUserDTO): Promise<IUsers> {
        const user = this.repository.create(data);
        return await this.repository.save(user);
    }

    async update(id: string, data: IUpdateUserDTO): Promise<IUsers | null> {
        await this.repository.update(id, data);
        return await this.repository.findOne({ where: { id } });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}