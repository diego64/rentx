/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

// eslint-disable-next-line import-helpers/order-imports
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCateroryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCateroryUseCase = container.resolve(ImportCateroryUseCase);
   
    await importCateroryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };