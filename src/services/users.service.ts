import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUsers } from "../interfaces/users.interface";
import { UserRepository } from "../repositories/users.repository";
import { AppError } from "../errors/AppError";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll(): Promise<IUsers[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: string): Promise<IUsers> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError("Usuário não encontrado.", 404);

    return user;
  }

  async create(data: ICreateUserDTO): Promise<IUsers> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) throw new AppError("E-mail já cadastrado.", 409);

    return await this.userRepository.create(data);
  }

  async update(id: string, data: IUpdateUserDTO): Promise<IUsers> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError("Usuário não encontrado.", 404);

    const updatedUser = await this.userRepository.update(id, data);

    if (!updatedUser) throw new AppError("Erro ao atualizar usuário.", 500);

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError("Usuário não encontrado.", 404);

    await this.userRepository.delete(id);
  }
}
