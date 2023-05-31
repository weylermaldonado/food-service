import { Repository, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
@injectable()
class ProductService extends BaseService {
  constructor(
    @inject(TYPES.Repository) private readonly productRepository: Repository
  ) {
    super(productRepository);
    this.productRepository = productRepository;
  }
}
export default ProductService;
