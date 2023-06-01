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

  async addProductAdditional(uuid: string, entity: any): Promise<any> {
    return this.product.findOneAndUpdate(
      { uuid },
      { $push: { additional: entity } },
      { new: true }
    );
  }

  async updateProductAdditional(
    productUUID: string,
    additionalUUID: string,
    entity: any
  ): Promise<any> {
    return this.product.findOneAndUpdate(
      { uuid: productUUID, "additional.uuid": additionalUUID },
      { $set: entity },
      { new: true }
    );
  }

  async deleteProductAdditional(
    productUUID: string,
    additionalUUID: string
  ): Promise<any> {
    return this.product.findOneAndUpdate(
      { uuid: productUUID },
      {
        $pull: {
          additional: {
            uuid: additionalUUID,
          },
        },
      },
      { new: true }
    );
  }
}
export default ProductRepository;
