import { Repository } from "@/infrastructure/interfaces";
import { mongooseObj } from "@/infrastructure/database/mongoose.database";
import { Model } from "mongoose";
import { injectable } from "inversify";
@injectable()
class BaseRepository implements Repository {
  constructor(private readonly model: Model<any>) {
    this.model = model;
  }
  async get(id: string) {
    return await this.model.findById(mongooseObj(id));
  }
  async getAll(
    propName: any,
    value: any,
    pageSize = 5,
    pageNum = 1,
    orderBy = "_id"
  ) {
    const skips = pageSize * (pageNum - 1);
    const filter = propName && value ? { [propName]: value } : {};

    return await this.model
      .find(filter)
      .sort(`-${orderBy}`)
      .skip(skips)
      .limit(pageSize);
  }
  async create(entity: any) {
    return await this.model.create(entity);
  }
  async update(id: any, entity: any) {
    return await this.model.findOneAndUpdate({ uuid: id }, entity, {
      new: true,
    });
  }
  async delete(id: any) {
    return await this.model.findOneAndRemove({ uuid: id });
  }

  async count() {
    return this.model.count();
  }

  async countWithFilter(filter: any) {
    return this.model.count(filter);
  }
}
export default BaseRepository;
