import { Controller, IOrderController } from "@/infrastructure/interfaces";
import auth from "@/middlewares/jwt.middleware";
import { Router } from "express";
export default function orderRoutes(OrderController: IOrderController) {
  const router = Router();
  router.get("/:orderId", (...args) => OrderController.get(...args));
  router.get("", (...args) => OrderController.getAll(...args));
  router.post("", auth, (...args) => OrderController.create(...args));
  router.patch("/:orderId/cancel", auth, (...args) =>
    OrderController.update(...args)
  );
  router.delete("/:orderId", (...args) => OrderController.delete(...args));
  router.post("/validate", auth, (...args) =>
    OrderController.validateOrder(...args)
  );
  return router;
}
