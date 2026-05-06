import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUsers } from "../interfaces/users.interface";
import { IUsersRepository } from "../interfaces/users.repository.interface";

export class UserRepository implements IUsersRepository {
    findAll(): Promise<IUsers[]> {
        
    }

    findById(id: string): Promise<IUsers | null> {
        
    }

    create(data: ICreateUserDTO): Promise<IUsers> {
        
    }

    update(id: string, data: IUpdateUserDTO): Promise<IUsers | null> {
        
    }

    delete(id: string): Promise<void> {
        
    }
}