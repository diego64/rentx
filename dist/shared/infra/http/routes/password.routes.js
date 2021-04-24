"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _ResetPasswordUserController = require("../../../../modules/accounts/useCases/resetPsswordUser/ResetPasswordUserController");

var _SendForgotPasswordMailController = require("../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const senForgotPasswordMailContoller = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordController = new _ResetPasswordUserController.ResetPasswordController();
passwordRoutes.post("/forgot", senForgotPasswordMailContoller.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);