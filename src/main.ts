import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import config from "./config";
import container from "./container/container";
import { TYPES } from "./container/types";
import middlewares from "./middlewares";
import errorHanlder from "./error-hanlder";

import { IDatabaseService } from "./modules/database/interface/IDatabase.service";
import { Logger } from "./utils/logger";

(async () => {
  const server = new InversifyExpressServer(container);
  await container.get<IDatabaseService>(TYPES.IDatabaseService).initialize();
  server
    .setConfig((app) => {
      middlewares(app, container);
    })
    .setErrorConfig((app) => {
      errorHanlder(app, container);
    })
    .build()
    .listen(config.port, () =>
      container.get<Logger>(TYPES.Logger).info(`server on ${config.port}`)
    );
})();
