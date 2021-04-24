"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("../../infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(brand, name, category_id) {
    let carsAvailable = this.cars.filter(car => car.available);

    if (brand) {
      carsAvailable = carsAvailable.filter(car => car.brand === brand);
    }

    if (name) {
      carsAvailable = carsAvailable.filter(car => car.name === name);
    }

    if (category_id) {
      carsAvailable = carsAvailable.filter(car => car.category_id === category_id);
    }

    return carsAvailable;
  }

  async findById(id) {
    const car = this.cars.find(car => car.id === id);
    return car;
  }

  async updateAvailable(id, available) {
    // eslint-disable-next-line eqeqeq
    const findIndex = this.cars.findIndex(car => car.id == id);
    this.cars[findIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;