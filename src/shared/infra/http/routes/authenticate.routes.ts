import { Router } from "express";

import { RefreshTokenController } from "@modules/accounts/refreshToken/RefreshTokenController";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenConroller = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenConroller.handle);

export { authenticateRoutes };
