import { Repository, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
@injectable()
class RestaurantService extends BaseService {
  constructor(
    @inject(TYPES.Repository) private readonly restaurantRepository: Repository
  ) {
    super(restaurantRepository);
    this.restaurantRepository = restaurantRepository;
  }
}
export default RestaurantService;
