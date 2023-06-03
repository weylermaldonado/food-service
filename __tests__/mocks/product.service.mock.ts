import { IProductService } from "../../src/infrastructure/interfaces";

export class MockProductService implements IProductService {
  countWithFilter(filter: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
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
