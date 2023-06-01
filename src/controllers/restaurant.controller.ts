import { Controller, IUserService, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { CreateRestaurantRequest } from "@/infrastructure/validators/restaurant.validator";
import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "@/infrastructure/response/base.response";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { RestaurantDTO } from "@/dto/restaurant.dto";

@provide(TYPES.Controller)
export class RestaurantController implements Controller {
  constructor(
    @inject(TYPES.RestaurantService)
    private readonly restaurantService: Service,
    @inject(TYPES.Service) private readonly userService: IUserService
  ) {}
  async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    return res.send({ message: "Hello" });
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
  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Validate request
      const { body, payload } = req;
      const isValidRequest = CreateRestaurantRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      // DTO Mapping
      const restaurantDTO = RestaurantDTO.from(body);
      restaurantDTO.generateID();

      // Save user
      await this.restaurantService.create(restaurantDTO.toPrimitive());

      // Relating restaurant to user
      await this.userService.update(payload.uuid, {
        restaurant_id: restaurantDTO.getID(),
      });

      return res.send(BaseResponse.created({ message: "Restaurant created" }));
    } catch (error: any) {
      next(BaseResponse.internalServerError(error.message));
    }
  }
}
