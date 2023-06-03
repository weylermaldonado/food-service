import { IUserService } from "../../src/infrastructure/interfaces";

export class MockUserService implements IUserService {
  generateToken(uuid: string, role: string): string {
    throw new Error("Method not implemented.");
  }
  getByUUID(uuid: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getByEmail(email: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getAll(
    propName: string,
    value: string,
    pageSize: number,
    pageNum: number,
    orderBy: string
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(id: string, entity: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  create(entity: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
