import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableController } from "@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvailableController();

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listAvaliableCarsController.handle);

export { carsRoutes };