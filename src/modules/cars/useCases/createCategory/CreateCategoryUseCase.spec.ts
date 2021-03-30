import { AppError } from "../../../../erros/AppError"

import { CategoriesRepositoryInMemory } from "../../../cars/repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("should be able to create a new categoty", async () => {
        const category = {
            name: "Categoty Test",
            description: "Category descrition Test",
        };
    
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
    
        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new categoty with name exits", async () => {

        expect(async () => {
            const category = {
                name: "Categoty Test",
                description: "Category descrition Test",
            };
        
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError)
    });
});