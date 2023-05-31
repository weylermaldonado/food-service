import { UserController } from "@/controllers/user.controller";
import { Controller, Repository, Service } from "@/infrastructure/interfaces";
import Router from "@/routes";
import { TYPES } from "@/infrastructure/types";
import { Router as IRouter } from "express";
import { ContainerModule, interfaces } from "inversify";
import { Model } from "mongoose";
import { User } from "@/models/user.model";
import UserRepository from "@/repositories/user.repository";
import UserService from "@/services/user.service";
import { RestaurantController } from "@/controllers/restaurant.controller";
import RestaurantService from "@/services/restaurant.service";
import RestaurantRepository from "@/repositories/restaurant.repository";
import { Restaurant } from "@/models/restaurant.model";
import { ProductController } from "@/controllers/product.controller";
import ProductService from "@/services/product.service";
import ProductRepository from "@/repositories/product.repository";
import { Product } from "@/models/product.model";
import { OrderController } from "@/controllers/order.controller";
import OrderService from "@/services/order.service";
import OrderRepository from "@/repositories/order.repository";
import { Order } from "@/models/order.model";

export const UserContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IRouter>(TYPES.Router).toDynamicValue(
      (context: interfaces.Context): IRouter => {
        return Router(
          context.container.get<UserController>(TYPES.UserController),
          context.container.get<RestaurantController>(
            TYPES.RestaurantController
          ),
          context.container.get<ProductController>(TYPES.ProductController),
          context.container.get<OrderController>(TYPES.OrderController)
        );
      }
    );
    bind<Controller>(TYPES.UserController)
      .to(UserController)
      .inSingletonScope();
    bind<Service>(TYPES.Service).to(UserService).inSingletonScope();
    bind<Repository>(TYPES.Repository).to(UserRepository).inSingletonScope();
    bind<Model<any>>(TYPES.User).toConstantValue(User);
  }
);

export const RestaurantContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<Controller>(TYPES.RestaurantController)
      .to(RestaurantController)
      .inSingletonScope();
    bind<Service>(TYPES.RestaurantService)
      .to(RestaurantService)
      .inSingletonScope();
    bind<Repository>(TYPES.RestaurantRepository)
      .to(RestaurantRepository)
      .inSingletonScope();
    bind<Model<any>>(TYPES.Restaurant).toConstantValue(Restaurant);
  }
);

export const ProductContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<Controller>(TYPES.ProductController)
      .to(ProductController)
      .inSingletonScope();
    bind<Service>(TYPES.ProductService).to(ProductService).inSingletonScope();
    bind<Repository>(TYPES.ProductRepository)
      .to(ProductRepository)
      .inSingletonScope();
    bind<Model<any>>(TYPES.Product).toConstantValue(Product);
  }
);

export const OrderContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<Controller>(TYPES.OrderController)
      .to(OrderController)
      .inSingletonScope();
    bind<Service>(TYPES.OrderService).to(OrderService).inSingletonScope();
    bind<Repository>(TYPES.OrderRepository)
      .to(OrderRepository)
      .inSingletonScope();
    bind<Model<any>>(TYPES.Order).toConstantValue(Order);
  }
);
