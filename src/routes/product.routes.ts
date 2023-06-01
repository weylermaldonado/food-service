import { Controller, IProductController } from "@/infrastructure/interfaces";
import isSuperUser from "@/middlewares/admin.middleware";
import auth from "@/middlewares/jwt.middleware";
import { Router } from "express";
export default function productRoutes(ProductController: IProductController) {
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

  // Additional
  router.patch(
    "/:productId/additional",
    [auth, isSuperUser],
    (...args: any[]) => ProductController.addProductAdditional(...args)
  );
  router.patch(
    "/:productId/additional/:additionalId",
    [auth, isSuperUser],
    (...args: any[]) => ProductController.updateProductAdditional(...args)
  );
  router.delete(
    "/:productId/additional/:additionalId",
    [auth, isSuperUser],
    (...args: any[]) => ProductController.deleteProductAdditional(...args)
  );

  return router;
}
