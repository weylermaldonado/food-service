import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "@/infrastructure/response/base.response";
import { USER_ROLE } from "@/shared/enums";

export default async function isSuperUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { payload } = req;
  if (payload.role !== USER_ROLE.SUPER_ADMIN) {
    const response = BaseResponse.methodNotAllowed("You shall no pass!");
    return next(response);
  }

  next();
}
