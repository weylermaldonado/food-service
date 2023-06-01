import { IUserController } from "@/infrastructure/interfaces";
import isSuperUser from "@/middlewares/admin.middleware";
import auth from "@/middlewares/jwt.middleware";
import { Router } from "express";
export default function userRoutes(UserController: IUserController) {
  const router = Router();
  router.post("/login", (...args) => UserController.get(...args));
  router.post("/admin", (...args) => UserController.createSuperUser(...args));
  router.post("", (...args) => UserController.create(...args));
  router.patch("/:userId", [auth, isSuperUser], (...args: any[]) =>
    UserController.update(...args)
  );

  return router;
}
