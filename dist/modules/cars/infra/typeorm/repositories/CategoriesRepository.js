"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _Category = require("../entities/Category");

class CategoriesRepository {
  constructor() {
    this.respository = void 0;
    this.respository = (0, _typeorm.getRepository)(_Category.Category);
  }

  async create({
    name,
    description
  }) {
    const category = this.respository.create({
      description,
      name
    });
    await this.respository.save(category);
  }

  async list() {
    const categories = await this.respository.find();
    return categories;
  }

  async findByName(name) {
    const category = await this.respository.findOne({
      name
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;