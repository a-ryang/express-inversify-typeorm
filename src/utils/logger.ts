import { injectable } from "inversify";
import winston from "winston";

@injectable()
export class Logger {
  private _logger: winston.Logger;

  private _format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.splat(),
    winston.format.printf((info) => {
      if (info instanceof Error) {
        return `${info.timestamp} ${info.level}: ${info.message} ${info.stack}`;
      }
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  );

  constructor() {
    this._logger = winston.createLogger({
      level: process.env.NODE_ENV === "production" ? "info" : "silly",
      transports: [new winston.transports.Console({ format: this._format })],
    });
  }

  error(err: any, message?: string) {
    if (message) this._logger.error(`${err.name}: ${message} \n ${err.stack}`);
    this._logger.error(`${err.name}: ${err.message} \n ${err.stack}`);
  }

  info(message: string) {
    this._logger.info(message);
  }
}
