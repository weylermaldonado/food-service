import {
  IOrderRepository,
  IProductRepository,
  Repository,
} from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
import { OrderCost, OrderValidation } from "@/shared/types";
import { ORDER_STATUS, SERVICE_WINDOW, TIPS_PERCENTAGE } from "@/shared/enums";
import dayjs from "dayjs";
@injectable()
class OrderService extends BaseService {
  private orderCost: OrderCost = {
    products: [],
    total: 0,
    subtotal: 0,
    tip: 0,
  };
  constructor(
    @inject(TYPES.OrderRepository)
    private readonly orderRepository: IOrderRepository,
    @inject(TYPES.ProductRepository)
    private readonly productRepository: IProductRepository
  ) {
    super(orderRepository);
    this.orderRepository = orderRepository;
  }

  async cancelOrder(filter: any, entity: any): Promise<any> {
    const order = await this.orderRepository.cancelOrder(
      { ...filter, status: ORDER_STATUS.WORKING },
      entity
    );
    if (!order) {
      throw new Error("Order status not in WORKING or not exists");
    }

    return order;
  }

  async create(entity: any): Promise<any> {
    this.validateServiceWindow();
    return this.orderRepository.create(entity);
  }

  async validateOrder(data: OrderValidation) {
    try {
      this.orderCost.products =
        await this.productRepository.findManyProductsWithAdditional(data);

      // Validations
      if (this.orderCost.products.length !== data.ids.length) {
        throw new Error("Some items are not available");
      }
      this.validateServiceWindow();

      // Cost calculation
      this.calculateSubtotal(data);
      this.selectProductAdditional(data);

      return this.calculateOrderTotal(data.tips);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private calculateOrderTotal(tip: number) {
    this.orderCost.tip = tip;

    if (this.orderCost.tip > TIPS_PERCENTAGE.NONE) {
      this.orderCost.tip = this.orderCost.tip * this.orderCost.subtotal;
      this.orderCost.total = this.orderCost.subtotal + this.orderCost.tip;
      return this.orderCost;
    }

    this.orderCost.total = this.orderCost.subtotal;

    return this.orderCost;
  }

  private calculateSubtotal(data: OrderValidation) {
    const additionalSelected: any[] = [];
    this.orderCost.subtotal = this.orderCost.products.reduce(
      (acc: any, curr: any) => {
        // Separate the products additional in a separate array
        const additional = curr.additional.filter(
          (item: any) =>
            data.additional_ids.includes(item.uuid) && item.available
        );
        if (additional.length) {
          additionalSelected.push(...additional);
        }
        // Calculate the cost of the products available
        acc += curr.price;

        return acc;
      },
      0
    );
    // Add the additional cost to the base price
    if (additionalSelected.length) {
      if (additionalSelected.length !== data.additional_ids.length) {
        throw new Error("Some additional are not available");
      }
      this.orderCost.subtotal += additionalSelected.reduce(
        (acc: any, curr: any) => (acc += curr.price),
        0
      );
    }
  }

  private selectProductAdditional(data: OrderValidation) {
    this.orderCost.products = this.orderCost.products.map((product: any) => {
      product.additional = product.additional.filter((item: any) =>
        data.additional_ids.includes(item.uuid)
      );

      return product;
    });
  }

  private validateServiceWindow() {
    const now = dayjs();
    if (
      now.hour() < SERVICE_WINDOW.OPEN_HOUR ||
      now.hour() >= SERVICE_WINDOW.CLOSE_HOUR
    ) {
      throw new Error("The service window start a 10hrs and finish at 18hrs");
    }
  }
}
export default OrderService;
