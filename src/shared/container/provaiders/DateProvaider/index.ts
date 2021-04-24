import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvaider } from "./implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvaider",
  DayjsDateProvaider
);
