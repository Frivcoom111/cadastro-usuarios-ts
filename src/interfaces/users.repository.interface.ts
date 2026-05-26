import type { ICreateUserInput, IUpdateUserInput } from "../validators/usersValidators"
import type { IUserResponse } from "./users.interface"

export interface IUsersRepository {
  findAll(): Promise<IUserResponse[]>
  findById(id: string): Promise<IUserResponse | null>
  findByEmail(email: string): Promise<IUserResponse | null>
  create(data: ICreateUserInput): Promise<IUserResponse | null>
  update(id: string, data: IUpdateUserInput): Promise<IUserResponse | null>
  delete(id: string): Promise<void>
}
