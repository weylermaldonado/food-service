import { Controller } from "@/infrastructure/interfaces";
import isSuperUser from "@/middlewares/admin.middleware";
import auth from "@/middlewares/jwt.middleware";
import { Router } from "express";
export default function productRoutes(ProductController: Controller) {
  const router = Router();
  router.get("/:productId", [auth, isSuperUser], (...args: any[]) =>
    ProductController.get(...args)
  );
  router.get("", auth, (...args: any[]) => ProductController.getAll(...args));
  router.post("", [auth, isSuperUser], (...args: any[]) =>
    ProductController.create(...args)
  );
  router.patch("/:productId", [auth, isSuperUser], (...args: any[]) =>
    ProductController.update(...args)
  );
  router.delete("/:productId", [auth, isSuperUser], (...args: any[]) =>
    ProductController.delete(...args)
  );

  return router;
}
