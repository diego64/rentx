/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCateroryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const importCateroryUseCase = new ImportCateroryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(importCateroryUseCase);

export { importCategoryController };