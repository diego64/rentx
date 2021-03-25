/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

// eslint-disable-next-line import-helpers/order-imports
import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

export { specificationRoutes }