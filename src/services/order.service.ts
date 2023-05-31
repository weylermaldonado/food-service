import { Repository, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
@injectable()
class OrderService extends BaseService {
  constructor(
    @inject(TYPES.OrderRepository) private readonly orderRepository: Repository
  ) {
    super(orderRepository);
    this.orderRepository = orderRepository;
  }
}
export default OrderService;
