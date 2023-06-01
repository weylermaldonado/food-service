import {
  IProductRepository,
  Repository,
  Service,
} from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
@injectable()
class ProductService extends BaseService {
  constructor(
    @inject(TYPES.ProductRepository)
    private readonly productRepository: IProductRepository
  ) {
    super(productRepository);
    this.productRepository = productRepository;
  }

  async countWithFilter(filter: any) {
    return this.productRepository.countWithFilter(filter);
  }

  async addProductAdditional(uuid: string, entity: any): Promise<any> {
    return this.productRepository.addProductAdditional(uuid, entity);
  }
  async updateProductAdditional(
    productUUID: string,
    additionalUUID: string,
    entity: any
  ): Promise<any> {
    const fields: any = {};
    for (const field in entity) {
      fields[`additional.$.${field}`] = entity[field];
    }

    return this.productRepository.updateProductAdditional(
      productUUID,
      additionalUUID,
      fields
    );
  }

  async deleteProductAdditional(productUUID: string, additionalUUID: string) {
    return this.productRepository.deleteProductAdditional(
      productUUID,
      additionalUUID
    );
  }
}
export default ProductService;
