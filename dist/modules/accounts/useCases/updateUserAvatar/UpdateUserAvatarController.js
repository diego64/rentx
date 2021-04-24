"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(request, response) {
    const {
      id
    } = request.user;
    const avatar_file = request.file.filename;

    const updateUserAvatarController = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);

    await updateUserAvatarController.execute({
      user_id: id,
      avatar_file
    });
    return response.status(204).send();
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;