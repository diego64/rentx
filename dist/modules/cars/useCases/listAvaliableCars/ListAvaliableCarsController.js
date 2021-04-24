"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvaliableCarsUseCase = require("./ListAvaliableCarsUseCase");

class ListAvailableController {
  async handle(request, response) {
    const {
      brand,
      name,
      category_id
    } = request.query;

    const listAvailableUseCase = _tsyringe.container.resolve(_ListAvaliableCarsUseCase.ListAvailableCarsUseCase);

    const cars = await listAvailableUseCase.execute({
      brand: brand,
      name: name,
      category_id: category_id
    });
    return response.json(cars);
  }

}

exports.ListAvailableController = ListAvailableController;