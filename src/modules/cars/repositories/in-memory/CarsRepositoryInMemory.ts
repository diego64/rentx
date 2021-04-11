import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    let carsAvailable = this.cars.filter((car) => car.available);

    if (brand) {
      carsAvailable = carsAvailable.filter((car) => car.brand === brand);
    }

    if (name) {
      carsAvailable = carsAvailable.filter((car) => car.name === name);
    }

    if (category_id) {
      carsAvailable = carsAvailable.filter(
        (car) => car.category_id === category_id
      );
    }
    return carsAvailable;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    // eslint-disable-next-line eqeqeq
    const findIndex = this.cars.findIndex((car) => car.id == id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
