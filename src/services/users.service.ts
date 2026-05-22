import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUserResponse } from "../interfaces/users.interface";
import { UserRepository } from "../repositories/users.repository";
import { AppError } from "../errors/AppError";
import { generateHash } from "../utils/generateHash";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll(): Promise<IUserResponse[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: string): Promise<IUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError("Usuário não encontrado.", 404);

    return user;
  }

  async create(data: ICreateUserDTO): Promise<IUserResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) throw new AppError("E-mail já cadastrado.", 409);

    const hashPassword = await generateHash(data.password);

    const userCreated = await this.userRepository.create({ ...data, password: hashPassword });

    if (!userCreated) throw new AppError("Erro ao criar usuário.", 500);

    return userCreated;
  }

  async update(id: string, data: IUpdateUserDTO): Promise<IUserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    if (data.password) {
      data.password = await generateHash(data.password);
    }

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
