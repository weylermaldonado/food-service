import { injectable } from "inversify";
import winston from "winston";
import { PROJECT } from "../config";
import { CustomLogger } from "../interfaces";

@injectable()
export class WatchLogger implements CustomLogger {
  private customLevels = {
    levels: {
      trace: 5,
      debug: 4,
      info: 3,
      warn: 2,
      error: 1,
      fatal: 0,
    },
    colors: {
      trace: "blue",
      debug: "green",
      info: "green",
      warn: "yellow",
      error: "red",
      fatal: "red",
    },
  };

  private formatter = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.splat(),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...meta } = info;

      return `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
      }`;
    })
  );

  private logger: winston.Logger;

  constructor() {
    const errorTransport = new winston.transports.File({
      filename: "../../../logs/error",
      level: "error",
    });

    const transport = new winston.transports.Console({
      format: this.formatter,
    });
    this.logger = winston.createLogger({
      level: PROJECT.mode === "development" ? "trace" : "error",
      levels: this.customLevels.levels,
      transports: [PROJECT.mode === "development" ? transport : errorTransport],
    });
    winston.addColors(this.customLevels.colors);
  }

  public trace(msg: any, meta?: any) {
    this.logger.log("trace", msg, meta);
  }

  public debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  public info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  public warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }

  public error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }

  public fatal(msg: any, meta?: any) {
    this.logger.log("fatal", msg, meta);
  }
}
