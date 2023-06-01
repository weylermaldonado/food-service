import { Controller } from "@/infrastructure/interfaces";
import auth from "@/middlewares/jwt.middleware";
import { Router } from "express";
export default function userRoutes(UserController: Controller) {
  const router = Router();
  router.post("/:login", (...args) => UserController.get(...args));
  router.post("", (...args) => UserController.create(...args));
  router.patch("/:userId", auth, (...args) => UserController.update(...args));

  return router;
}
