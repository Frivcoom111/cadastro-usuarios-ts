import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUsers } from "./users.interface";

export interface IUsersRepository {
  findAll(): Promise<IUsers[]>;
  findById(id: string): Promise<IUsers | null>;
  create(data: ICreateUserDTO): Promise<IUsers>;
  update(id: string, data: IUpdateUserDTO): Promise<IUsers | null>;
  delete(id: string): Promise<void>;
}