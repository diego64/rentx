"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _ListAvaliableCarsUseCase = require("./ListAvaliableCarsUseCase");

let carsRepositoryInMemory;
let listAvailableCarsUseCase;
describe("List Available Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvaliableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "DEF-0000",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "DEF-1111",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car Test"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "DEF-2222",
      fine_amount: 40,
      brand: "Brand Test",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand Test"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "DEF-3333",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "category_test"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_test"
    });
    expect(cars).toEqual([car]);
  });
});