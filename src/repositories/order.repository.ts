import { TYPES } from "@/infrastructure/types";

import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import BaseRepository from "./base.repository";
@injectable()
class OrderRepository extends BaseRepository {
  constructor(@inject(TYPES.Order) private readonly order: Model<any>) {
    super(order);
    order = this.order;
  }
}
export default OrderRepository;
