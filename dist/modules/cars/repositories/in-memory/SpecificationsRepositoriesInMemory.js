"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoriesInMemory = void 0;

var _Specification = require("../../infra/typeorm/entities/Specification");

class SpecificationsRepositoriesInMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    description,
    name
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description
    });
    this.specifications.push(specification);
    return specification;
  }

  async findByName(name) {
    return this.specifications.find(specification => specification.name === name);
  }

  async findByIds(ids) {
    const allSpecifications = this.specifications.filter(specification => ids.includes(specification.id));
    return allSpecifications;
  }

}

exports.SpecificationsRepositoriesInMemory = SpecificationsRepositoriesInMemory;