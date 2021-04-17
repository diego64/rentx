import { container } from "tsyringe";

import { IDateProvider } from "./DateProvaider/IDateProvider";
import { DayjsDateProvaider } from "./DateProvaider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvaider",
  DayjsDateProvaider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
);
