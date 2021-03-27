import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "../../../../erros/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRsepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRsepository
    ){}

    async execute({
        name,
        email, 
        password,
        driver_license, 
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new AppError("User already exists");
        }

        const passwordHash = await hash(password, 8);


        await this.usersRepository.create({
            name,
            email, 
            password: passwordHash,
            driver_license, 
        });
    }
}

export { CreateUserUseCase }