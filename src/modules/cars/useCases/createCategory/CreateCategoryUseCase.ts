/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { inject, injectable } from "tsyringe";

import { AppError } from "@erros/AppError";
import { ICategoriesRepository } from "modules/cars/repositories/ICategoriesRepository";

interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
        ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category Already exists!")
        }
    
        this.categoriesRepository.create({ name, description})
    }
}

export { CreateCategoryUseCase }