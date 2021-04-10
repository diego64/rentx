import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const senForgotPasswordMailContoller = new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", senForgotPasswordMailContoller.handle);

export { passwordRoutes };