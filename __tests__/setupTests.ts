import "reflect-metadata";
import { SharedBootstrap } from "../src/infrastructure/bootstrap";

beforeAll(async () => {
  new SharedBootstrap().initTest();
});
