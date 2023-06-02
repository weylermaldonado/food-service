import express from "express";
import helmet from "helmet";
import ErrorMiddleware from "@/middlewares/error.middleware";
import {
  Controller,
  IOrderController,
  IProductController,
  IUserController,
} from "@/infrastructure/interfaces";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";
export default function Router(
  UserController: IUserController,
  ProductController: IProductController,
  OrderController: IOrderController
): express.Router {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(helmet());

  apiRoutes.use("/users", userRoutes(UserController));
  apiRoutes.use("/products", productRoutes(ProductController));
  apiRoutes.use("/orders", orderRoutes(OrderController));

  router.use("/api/v1", apiRoutes);

  router.use(ErrorMiddleware);

  return router;
}
