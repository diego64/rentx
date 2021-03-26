/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { Specification } from "../entities/Specification";
import "reflect-metadata";

interface ICreateSpecificationDTO {
    name: string,
    description: string
}


interface ISpecificationsRepository {
    create({ description, name}: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO }