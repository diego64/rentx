"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/provaiders/DateProvaider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/provaiders/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/erros/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvaider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be albe to send a forgot passeord mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "196496",
      email: "teste@email.com",
      name: "Usuario de teste",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("teste@email.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be albe to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("noemail@email.com")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("should be albe to create ab users token", async () => {
    const genetateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "787330",
      email: "teste_teste@email.com",
      name: "Novo usuario de teste",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("teste_teste@email.com");
    expect(genetateTokenMail).toBeCalled();
  });
});