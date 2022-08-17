import { Application, json, urlencoded } from "express";
import helmet from "helmet";
import { Container } from "inversify";

export default (app: Application, container: Container) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
};
