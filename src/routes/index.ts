import express from "express";
import helmet from "helmet";
import ErrorMiddleware from "@/middlewares/error.middleware";
import {
  Controller,
  IProductController,
  IUserController,
} from "@/infrastructure/interfaces";
import userRoutes from "./user.routes";
import restaurantRoutes from "./restaurant.routes";
import productRoutes from "./product.routes";
export default function Router(
  UserController: IUserController,
  RestaurantController: Controller,
  ProductController: IProductController,
  OrderController: Controller
): express.Router {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(helmet());

  apiRoutes.use("/users", userRoutes(UserController));
  apiRoutes.use("/restaurants", restaurantRoutes(RestaurantController));
  apiRoutes.use("/products", productRoutes(ProductController));
  apiRoutes.use("/orders", restaurantRoutes(OrderController));

  router.use("/api/v1", apiRoutes);

  router.use(ErrorMiddleware);

  return router;
}
