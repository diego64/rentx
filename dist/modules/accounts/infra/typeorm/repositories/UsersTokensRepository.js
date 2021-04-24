"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _typeorm = require("typeorm");

var _UserTokens = require("../entities/UserTokens");

class UsersTokensRepository {
  constructor() {
    this.repositoy = void 0;
    this.repositoy = (0, _typeorm.getRepository)(_UserTokens.UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = this.repositoy.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.repositoy.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const usersTokens = await this.repositoy.findOne({
      user_id,
      refresh_token
    });
    return usersTokens;
  }

  async deletebyId(id) {
    await this.repositoy.delete(id);
  }

  async findByRefreshToken(refresh_token) {
    const userToken = await this.repositoy.findOne({
      refresh_token
    });
    return userToken;
  }

}

exports.UsersTokensRepository = UsersTokensRepository;