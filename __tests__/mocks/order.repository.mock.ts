import { IOrderRepository } from "../../src/infrastructure/interfaces";
export class MockOrderRepository implements IOrderRepository {
  cancelOrder(filter: any, entity: any): Promise<any> {
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
  count(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  countWithFilter(filter: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
