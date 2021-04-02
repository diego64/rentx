import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListCategoriesController();

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listAvaliableCarsController.hadle);

export { carsRoutes };