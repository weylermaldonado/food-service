import { IOrderService } from "../../src/infrastructure/interfaces";
import { OrderValidation } from "../../src/shared/types";
export class MockOrderService implements IOrderService {
  validateOrder(data: OrderValidation): Promise<any> {
    throw new Error("Method not implemented.");
  }
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
}
