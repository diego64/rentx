import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRsepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email:string): Promise<User>;
}

export { IUsersRsepository };