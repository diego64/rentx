import { inject, injectable } from "tsyringe";
import { verify, sign } from "jsonwebtoken";

import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";

import auth from "@config/auth";
import { AppError } from "@shared/erros/AppError";
import { IDateProvider } from "@shared/container/provaiders/DateProvaider/IDateProvider";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvaider")
        private dateProvider: IDateProvider
    ){}

    async execute(token: string): Promise<string> {
        const { email, sub} = verify(token, auth.secret_refresh_token) as IPayload;

        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if(!userToken) {
            throw new AppError("Refresh Token does not exists!")
        }

        await this.usersTokensRepository.deletebyId(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        });


    const expires_date = this.dateProvider.addDays(
        auth.expires_refresh_token_days
    );

await this.usersTokensRepository.create({
    expires_date,
    refresh_token,
    user_id,

})
        return refresh_token;
    }
}

export { RefreshTokenUseCase }