import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUserResponse } from "./users.interface";

export interface IUsersRepository {
  findAll(): Promise<IUserResponse[]>;
  findById(id: string): Promise<IUserResponse | null>;
  findByEmail(email: string): Promise<IUserResponse | null>;
  create(data: ICreateUserDTO): Promise<IUserResponse | null>;
  update(id: string, data: IUpdateUserDTO): Promise<IUserResponse | null>;
  delete(id: string): Promise<void>;
}