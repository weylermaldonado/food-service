import { CustomLogger } from "../../src/infrastructure/interfaces";

export class MockLogger implements CustomLogger {
  trace(msg: any, meta?: any): void {}
  debug(msg: any, meta?: any): void {}
  info(msg: any, meta?: any): void {}
  warn(msg: any, meta?: any): void {}
  error(msg: any, meta?: any): void {}
  fatal(msg: any, meta?: any): void {}
}
