import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/erros/AppError";
import { IUsersRsepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRsepository
    ){}

    //Comparação do e-mail informado pelo usuário com o e-mail cadastrado no BD
    async execute({ email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Email or password incorrect!")
        }

    //Comparação de senha informada pelo usuário com a senha cadastrada no BD
    const passwordMatch = await compare(password, user.password);

    //Verificacao da senha
    if(!passwordMatch) {
        throw new AppError("Email or password incorrect!")
      }

    //Geando um token
    const token = sign({}, "4c0cafd1773500edf30a69a2f7be8753", {
        subject: user.id,
        expiresIn: "1d"
    });
    
    const tokenReturn: IResponse = { 
        token,
        user: {
            name: user.name,
            email: user.email
        },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }