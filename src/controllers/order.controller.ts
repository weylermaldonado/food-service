import { Controller, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

@provide(TYPES.Controller)
export class OrderController implements Controller {
  constructor(
    @inject(TYPES.OrderService) private readonly orderService: Service
  ) {}
  async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    return res.send({ message: "Hello product" });
  }
  getAll(...args: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(...args: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(...args: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  create(...args: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
