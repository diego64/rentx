/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string,
    description: string
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO }