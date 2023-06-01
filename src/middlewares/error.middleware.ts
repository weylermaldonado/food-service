import { HttpException } from "@/shared/errors/http.error";
import { NextFunction, Request, Response } from "express";

export default function ErrorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(err.httpCode).send({
    status: err.httpCode,
    message: err.message || "Internal server error",
    details: err.validationErrors,
  });
}
