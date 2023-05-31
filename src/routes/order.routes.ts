import { Controller } from "@/infrastructure/interfaces";
import { Router } from "express";
export default function orderRoutes(OrderController: Controller) {
  const router = Router();
  router.get("/:orderId", (...args) => OrderController.get(...args));
  router.get("", (...args) => OrderController.getAll(...args));
  router.post("", (...args) => OrderController.create(...args));
  router.patch("/:orderId", (...args) => OrderController.update(...args));
  router.delete("/:orderId", (...args) => OrderController.delete(...args));

  return router;
}
