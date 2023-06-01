import { UserDTO } from "@/dto/user.dto";
import { Controller, IUserService, Service } from "@/infrastructure/interfaces";
import { BaseResponse } from "@/infrastructure/response/base.response";
import { TYPES } from "@/infrastructure/types";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "@/infrastructure/validators/user.validator";
import { USER_ROLE } from "@/shared/enums";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

@provide(TYPES.Controller)
export class UserController implements Controller {
  constructor(
    @inject(TYPES.Service) private readonly userService: IUserService
  ) {}
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const isValidRequest = LoginUserRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      // Mapping to DTO
      const user = await this.userService.getByEmail(body.email);
      if (!user) {
        return next(BaseResponse.recordNotFound("User not found."));
      }
      const userDTO = UserDTO.from(user);
      const isValidPassword = await userDTO.passwordMatch(
        userDTO.getPassword(),
        body.password
      );

      if (!isValidPassword) {
        return next(BaseResponse.unauthorized("Password does't match"));
      }

      const jwt = await this.userService.generateToken(
        userDTO.getID(),
        userDTO.getRole()
      );

      return res.send(BaseResponse.ok({ token: jwt }));
    } catch (error: any) {
      next(BaseResponse.internalServerError(error.message));
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate request
      const { body } = req;
      const isValidRequest = CreateUserRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      // DTO Mapping
      const userDTO = UserDTO.from(body);
      await userDTO.hashPassword(body.password);
      userDTO.generateID();

      // Save user
      await this.userService.create(userDTO.toPrimitive());

      return res.send(BaseResponse.created({ message: "User created" }));
    } catch (error: any) {
      next(BaseResponse.internalServerError(error.message));
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { userId } = req.params;
      // Validate request
      const isValidRequest = UpdateUserRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      // Update user
      const user = await this.userService.update(userId, body);
      if (!user) {
        return next(BaseResponse.recordNotFound("User not found."));
      }

      return res.send(BaseResponse.ok({ message: "User deactivated" }));
    } catch (error: any) {
      next(BaseResponse.internalServerError(error.message));
    }
  }

  async createSuperUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      // Validate request
      const isValidRequest = CreateUserRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      const userDTO = UserDTO.from(body);
      await userDTO.hashPassword(body.password);
      userDTO.generateID();
      userDTO.setRole(USER_ROLE.SUPER_ADMIN);

      // Save user
      await this.userService.create(userDTO.toPrimitive());

      return res.send(BaseResponse.ok({ message: "SuperUser created" }));
    } catch (error: any) {
      next(BaseResponse.internalServerError(error.message));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method not implemented.");
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method not implemented.");
  }
}
