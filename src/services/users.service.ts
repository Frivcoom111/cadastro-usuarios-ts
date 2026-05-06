import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUsers } from "../interfaces/users.interface";
import { UserRepository } from "../repositories/users.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository;
    }

    async findAll(): Promise<IUsers[]> {
        return await this.userRepository.findAll();
    }

    async findById(id: string): Promise<IUsers> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new Error("Erro ao buscar usuário.");

        return user;
    }

    async create(data: ICreateUserDTO): Promise<IUsers> {
        const createdUser = await this.userRepository.create(data);

        return createdUser
    }

    async update(id: string, data: IUpdateUserDTO): Promise<IUsers | null> {
        const updatedUser = this.userRepository.update(id, data);

        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}