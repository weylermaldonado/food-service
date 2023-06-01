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
