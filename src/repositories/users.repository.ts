import { Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUserResponse } from "../interfaces/users.interface";
import { IUsersRepository } from "../interfaces/users.repository.interface";
import { User } from "../entities/users.entity";
import AppDataSource from "../config/database";

const userSelect = {
  id: true,
  name: true,
  email: true,
  age: true,
  phone: true,
} as const;
export class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<IUserResponse[]> {
    return await this.repository.find({ select: userSelect });
  }

  async findById(id: string): Promise<IUserResponse | null> {
    return await this.repository.findOne({ where: { id }, select: userSelect });
  }

  async findByEmail(email: string): Promise<IUserResponse | null> {
    return await this.repository.findOne({
      where: { email },
      select: userSelect,
    });
  }

  async create(data: ICreateUserDTO): Promise<IUserResponse | null> {
    const saved = await this.repository.save(this.repository.create(data));

    return await this.repository.findOne({
      where: { id: saved.id },
      select: userSelect,
    });
  }

  async update( id: string, data: IUpdateUserDTO ): Promise<IUserResponse | null> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id }, select: userSelect });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
