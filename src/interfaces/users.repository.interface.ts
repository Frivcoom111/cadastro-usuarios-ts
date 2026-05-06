import { ICreateUserDTO } from "../dtos/ICreateUserDTO.js";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO.js";
import { IUsers } from "./users.interface.js";

export interface IUsersRepository {
  findAll(): Promise<IUsers[]>;
  findById(id: string): Promise<IUsers | null>;
  create(data: ICreateUserDTO): Promise<IUsers>;
  update(id: string, data: IUpdateUserDTO): Promise<IUsers | null>;
  delete(id: string): Promise<void>;
}