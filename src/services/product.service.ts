import { Repository, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
@injectable()
class ProductService extends BaseService {
  constructor(
    @inject(TYPES.ProductRepository)
    private readonly productRepository: Repository
  ) {
    super(productRepository);
    this.productRepository = productRepository;
  }

  async countWithFilter(filter: any) {
    return this.productRepository.countWithFilter(filter);
  }
}
export default ProductService;
