import { container } from "tsyringe";

import { IDateProvider } from "./DateProvaider/IDateProvider";
import { DayjsDateProvaider } from "./DateProvaider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvaider",
  DayjsDateProvaider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
