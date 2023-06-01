import { Controller } from "@/infrastructure/interfaces";
import isSuperUser from "@/middlewares/admin.middleware";
import auth from "@/middlewares/jwt.middleware";
import { Router } from "express";
export default function restaurantRoutes(RestaurantController: Controller) {
  const router = Router();
  router.get("/:restaurantId", (...args) => RestaurantController.get(...args));
  router.get("", (...args) => RestaurantController.getAll(...args));
  router.post("", [auth, isSuperUser], (...args: any[]) =>
    RestaurantController.create(...args)
  );
  router.patch("/:restaurantId", (...args) =>
    RestaurantController.update(...args)
  );
  router.delete("/:restaurantId", (...args) =>
    RestaurantController.delete(...args)
  );

  return router;
}
