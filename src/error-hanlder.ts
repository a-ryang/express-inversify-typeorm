import { Application, Request, Response, NextFunction } from "express";
import { Container } from "inversify";
import { TYPES } from "./container/types";
import { HttpException } from "./shared/errors/http-exception";
import { Logger } from "./utils/logger";

export default (app: Application, container: Container) => {
  const logger = container.get<Logger>(TYPES.Logger);

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.error(`throwing a 'not found' by ${req.ip}`);
    return res.status(404).end();
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
      const { name, status, message, info } = err;
      return res.status(status).json({ name, message, info });
    }
    logger.error(err); // logging server error
    return res.status(500).json({ message: "Oops! something is wrong" });
  });
};
