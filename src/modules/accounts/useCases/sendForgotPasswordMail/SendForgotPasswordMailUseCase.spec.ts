import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvaider } from "@shared/container/provaiders/DateProvaider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/provaiders/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/erros/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvaider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvaider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be albe to send a forgot passeord mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "196496",
      email: "teste@email.com",
      name: "Usuario de teste",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("teste@email.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be albe to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("noemail@email.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be albe to create ab users token", async () => {
    const genetateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "787330",
      email: "teste_teste@email.com",
      name: "Novo usuario de teste",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("teste_teste@email.com");

    expect(genetateTokenMail).toBeCalled();
  });
});
