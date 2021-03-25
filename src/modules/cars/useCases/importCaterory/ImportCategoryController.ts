/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

// eslint-disable-next-line import-helpers/order-imports
import { Request, Response } from "express";
import { ImportCateroryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {

constructor(private importCateroryUseCase: ImportCateroryUseCase){}

  handle(request: Request, response: Response): Response {
    const { file } = request;
   
    this.importCateroryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };