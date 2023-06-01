import { TYPES } from "@/infrastructure/types";
import { User } from "@/models/user.model";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import BaseRepository from "./base.repository";
@injectable()
class UserRepository extends BaseRepository {
  constructor(@inject(TYPES.User) private readonly user: Model<any>) {
    super(user);
    user = this.user;
  }

  async getByUUID(uuid: string) {
    return this.user.findOne({ uuid });
  }

  async getByEmail(email: string) {
    return this.user.findOne({ email, active: true });
  }
}
export default UserRepository;
