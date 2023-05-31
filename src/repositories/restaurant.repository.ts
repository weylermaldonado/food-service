import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import BaseRepository from "./base.repository";
@injectable()
class RestaurantRepository extends BaseRepository {
  constructor(
    @inject(TYPES.Restaurant) private readonly restaurant: Model<any>
  ) {
    super(restaurant);
    restaurant = this.restaurant;
  }
}
export default RestaurantRepository;
