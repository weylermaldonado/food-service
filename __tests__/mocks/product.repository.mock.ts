import { IProductRepository } from "../../src/infrastructure/interfaces";
import { OrderValidation } from "../../src/shared/types";
export class MockProductRepository implements IProductRepository {
  addProductAdditional(uuid: string, entity: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updateProductAdditional(
    productUUID: string,
    additionalUUID: string,
    entity: any
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteProductAdditional(
    productUUID: string,
    additionalUUID: string
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findManyProductsWithAdditional(data: OrderValidation): Promise<any> {
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
