import { AppContainer } from "@/infrastructure/startup/containers";
import { StartModule } from "@/index";
import { startExpress } from "@/infrastructure/framework/express.framework";
import { mongooseConnection } from "@/infrastructure/database/mongoose.database";
import { AppDependencies } from "@/infrastructure/d-injection/config";
import {
  CommonContainerModule,
  OrderContainerModule,
  ProductContainerModule,
  UserContainerModule,
} from "@/infrastructure/Module";
import { TYPES } from "@/infrastructure/types";
import { Router } from "express";

export class SharedBootstrap implements StartModule {
  async init(): Promise<void> {
    try {
      AppContainer.load(
        UserContainerModule,
        ProductContainerModule,
        OrderContainerModule,
        CommonContainerModule
      );

      // database connection
      await mongooseConnection();

      // express server
      let router = AppContainer.get<Router>(TYPES.Router);
      await startExpress(router);

      // independency injection
      new AppDependencies().register(AppContainer);
    } catch (error: any) {
      console.error(
        `[${SharedBootstrap.name}] error starting module --> ${error}`
      );
    }
  }

  async initTest(): Promise<void> {
    try {
      // independency injection
      new AppDependencies().register(AppContainer);
    } catch (error) {
      console.error(
        `[${SharedBootstrap.name}] error starting module --> ${error}`
      );
    }
  }
}
