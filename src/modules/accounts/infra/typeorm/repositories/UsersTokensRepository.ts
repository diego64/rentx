import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";


import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    private repositoy: Repository<UserTokens>

    constructor() {
        this.repositoy = getRepository(UserTokens);
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repositoy.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.repositoy.save(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string, 
        refresh_token: string
        ): Promise<UserTokens> {
            const usersTokens = await this.repositoy.findOne({
                user_id,
                refresh_token
            });
            return usersTokens;
    }

    async deletebyId(id: string): Promise<void> {
        await this.repositoy.delete(id);
    }
}

export { UsersTokensRepository }