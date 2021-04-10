import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRsepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/erros/AppError";
import { IDateProvider } from "@shared/container/provaiders/DateProvaider/IDateProvider";
import { IMailProvider } from "@shared/container/provaiders/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRsepository,
        @inject("UsersTokensRepository")
        private UsersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvaider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailprovider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Users does not exists!")
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.UsersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        await this.mailprovider.sendMail(
            email,
            "Recuperação de senha",
            `O link para o reset é ${token}`
        );
    }
}

export { SendForgotPasswordMailUseCase }