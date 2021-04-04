import { container } from "tsyringe";

import { IDateProvider } from "./DateProvaider/IDateProvider";
import { DayjsDateProvaider } from "./DateProvaider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvaider",
    DayjsDateProvaider
);