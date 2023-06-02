import { OrderValidation } from "@/shared/types";
import { JWTToken } from "../auth/jwt.token";

export interface Service {
  get(id: string): Promise<any>;
  getAll(
    propName: string,
    value: string,
    pageSize: number,
    pageNum: number,
    orderBy: string
  ): Promise<any>;
  update(id: string, entity: any): Promise<any>;
  delete(id: string): Promise<any>;
  create(entity: any): Promise<any>;
}

export interface Repository {
  get(id: string): Promise<any>;
  getAll(
    propName: string,
    value: string,
    pageSize: number,
    pageNum: number,
    orderBy: string
  ): Promise<any>;
  update(id: string, entity: any): Promise<any>;
  delete(id: string): Promise<any>;
  create(entity: any): Promise<any>;
  count(): Promise<any>;
  countWithFilter(filter: any): Promise<any>;
}

export interface Controller {
  get(...args: any): Promise<any>;
  getAll(...args: any): Promise<any>;
  update(...args: any): Promise<any>;
  delete(...args: any): Promise<any>;
  create(...args: any): Promise<any>;
}

export interface JWT {
  sign(data: object): Promise<JWTToken>;
  verify(token: JWTToken): Promise<any>;
}

export interface IUserService extends Service {
  generateToken(uuid: string, role: string): string;
  getByUUID(uuid: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
}

export interface IUserRepository extends Repository {
  getByUUID(uuid: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
}

export interface IUserController extends Controller {
  createSuperUser(...args: any): Promise<any>;
}

export interface IProductService extends Service {
  countWithFilter(filter: any): Promise<any>;
  addProductAdditional(uuid: string, entity: any): Promise<any>;
  updateProductAdditional(
    productUUID: string,
    additionalUUID: string,
    entity: any
  ): Promise<any>;
  deleteProductAdditional(
    productUUID: string,
    additionalUUID: string
  ): Promise<any>;
}

export interface IProductRepository extends Repository {
  addProductAdditional(uuid: string, entity: any): Promise<any>;
  updateProductAdditional(
    productUUID: string,
    additionalUUID: string,
    entity: any
  ): Promise<any>;
  deleteProductAdditional(
    productUUID: string,
    additionalUUID: string
  ): Promise<any>;
  findManyProductsWithAdditional(data: OrderValidation): Promise<any>;
}

export interface IProductController extends Controller {
  addProductAdditional(...args: any): Promise<any>;
  updateProductAdditional(...args: any): Promise<any>;
  deleteProductAdditional(...args: any): Promise<any>;
}

export interface CustomLogger {
  trace(msg: any, meta?: any): void;
  debug(msg: any, meta?: any): void;
  info(msg: any, meta?: any): void;
  warn(msg: any, meta?: any): void;
  error(msg: any, meta?: any): void;
  fatal(msg: any, meta?: any): void;
}

export interface IOrderService extends Service {
  validateOrder(data: OrderValidation): Promise<any>;
  cancelOrder(filter: any, entity: any): Promise<any>;
}

export interface IOrderController extends Controller {
  validateOrder(...args: any): Promise<any>;
}

export interface IOrderRepository extends Repository {
  cancelOrder(filter: any, entity: any): Promise<any>;
}
