import { Controller } from "@/infrastructure/interfaces";
import { Router } from "express";
export default function productRoutes(ProductController: Controller) {
  const router = Router();
  router.get("/:productId", (...args) => ProductController.get(...args));
  router.get("", (...args) => ProductController.getAll(...args));
  router.post("", (...args) => ProductController.create(...args));
  router.patch("/:productId", (...args) => ProductController.update(...args));
  router.delete("/:productId", (...args) => ProductController.delete(...args));

  return router;
}
