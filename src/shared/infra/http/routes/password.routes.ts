import { ResetPasswordController } from "@modules/accounts/useCases/resetPsswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const senForgotPasswordMailContoller = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forgot", senForgotPasswordMailContoller.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };