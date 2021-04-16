import { container } from "tsyringe";

import { IDateProvider } from "./DateProvaider/IDateProvider";
import { DayjsDateProvaider } from "./DateProvaider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvaider",
  DayjsDateProvaider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);
