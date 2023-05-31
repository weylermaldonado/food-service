import { TYPES } from "@/infrastructure/types";

import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import BaseRepository from "./base.repository";
@injectable()
class ProductRepository extends BaseRepository {
  constructor(@inject(TYPES.Product) private readonly product: Model<any>) {
    super(product);
    product = this.product;
  }
}
export default ProductRepository;
