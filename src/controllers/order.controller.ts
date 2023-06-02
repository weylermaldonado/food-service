import { OrderDTO } from "@/dto/order.dto";
import { ProductDTO } from "@/dto/product.dto";
import {
  Controller,
  CustomLogger,
  IOrderService,
  Service,
} from "@/infrastructure/interfaces";
import { BaseResponse } from "@/infrastructure/response/base.response";
import { TYPES } from "@/infrastructure/types";
import {
  CreateOrderRequest,
  ValidateOrderRequest,
} from "@/infrastructure/validators/order.validator";
import { ORDER_STATUS, USER_ROLE } from "@/shared/enums";

import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

@provide(TYPES.Controller)
export class OrderController implements Controller {
  constructor(
    @inject(TYPES.OrderService) private readonly orderService: IOrderService,
    @inject(TYPES.Logger) private readonly logger: CustomLogger
  ) {}
  async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    return res.send({ message: "Hello product" });
  }
  getAll(...args: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(...args: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { params, payload } = req;
      this.logger.trace(
        `[${
          OrderController.name
        } - Cancel order] Incoming payload -> ${JSON.stringify({
          ...params,
          ...payload,
        })}`
      );

      const filter =
        payload.role === USER_ROLE.SUPER_ADMIN
          ? { uuid: params.orderId }
          : { uuid: params.orderId, user_id: payload.uuid };
      this.logger.trace(`Filter applied -> ${JSON.stringify(filter)}`);

      await this.orderService.cancelOrder(filter, {
        status: ORDER_STATUS.CANCELLED,
      });
      return res.send(BaseResponse.ok({ message: "Order cancelled" }));
    } catch (error: any) {
      this.logger.error(
        `[${OrderController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }
  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { body, payload } = req;
      this.logger.trace(
        `[${
          OrderController.name
        } - Create order] Incoming payload -> ${JSON.stringify(body)}`
      );
      const isValidRequest = CreateOrderRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      const orderDTO = OrderDTO.from(body);
      orderDTO.generateID();
      orderDTO.setUserId(payload.uuid);

      const result = await this.orderService.create(orderDTO.toPrimitive());
      const orderResponse = OrderDTO.from(result);

      return res.send(BaseResponse.created(orderResponse.toPrimitive()));
    } catch (error: any) {
      this.logger.error(
        `[${OrderController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }

  async validateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate request
      const { body } = req;
      this.logger.trace(
        `[${
          OrderController.name
        } - Validate order] Incoming payload -> ${JSON.stringify(body)}`
      );
      const isValidRequest = ValidateOrderRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      const result = await this.orderService.validateOrder({
        ...isValidRequest.value.products,
        tips: isValidRequest.value.tip,
      });

      const product = result.products.map((product: any) =>
        ProductDTO.from(product)
      );

      return res.send(
        BaseResponse.ok({
          products: product,
          total: result.total,
          subtotal: result.subtotal,
          tip: result.tip,
        })
      );
    } catch (error: any) {
      this.logger.error(
        `[${OrderController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }
}
