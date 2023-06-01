import { IUserRepository, JWT } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
import { USER_ROLE } from "@/shared/enums";
@injectable()
class UserService extends BaseService {
  constructor(
    @inject(TYPES.Repository) private readonly userRepository: IUserRepository,
    @inject(TYPES.JWT) private readonly jwtService: JWT
  ) {
    super(userRepository);
    this.userRepository = userRepository;
  }

  async generateToken(uuid: string, role: USER_ROLE) {
    const authToken = await this.jwtService.sign({ uuid, role });
    return authToken.getToken();
  }

  async getByUUID(uuid: string) {
    return this.userRepository.getByUUID(uuid);
  }

  async getByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }
}
export default UserService;
