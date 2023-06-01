import { JSONWebToken } from "@/infrastructure/auth/jsonwebtoken.jwt";
import { JWTToken } from "@/infrastructure/auth/jwt.token";
import { BaseResponse } from "@/infrastructure/response/base.response";
import { JWT_CONFIG } from "@/infrastructure/config";
import { NextFunction, Request, Response } from "express";

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1] || "";
  const reqToken = new JWTToken(token, false);
  const jwt = new JSONWebToken(JWT_CONFIG.secretKey);
  const result = await jwt.verify(reqToken);

  if (result.error) {
    const response = BaseResponse.unauthorized(result.error.message);
    return next(response);
  }

  req.payload = result;

  next();
}
