import OrderService from "../../../src/services/order.service";

import { MockOrderRepository } from "../../mocks/order.repository.mock";
import { MockProductRepository } from "../../mocks/product.repository.mock";
import { OrderValidation } from "../../../src/shared/types";

describe("order-use-case", () => {
  it("should create an order", async () => {
    // arrange
    const mockRepo = new MockOrderRepository();
    const service = new OrderService(mockRepo, new MockProductRepository());
    const mockOrder = {
      products: [
        {
          name: "Salsa roja",
          price: 150,
          category: "main_course",
          notes: "Con el chile del que no pica",
          additional: [
            {
              name: "Salsa verde",
              price: 5,
              available: true,
              uuid: "24fd6a84-f683-4688-b5ca-831b7b41638c",
            },
          ],
          uuid: "66f46a95-c91d-4f9c-bb29-40570824c7a2",
        },
        {
          name: "Chiles Rellenos",
          price: 150,
          category: "main_course",
          notes: "Con el chile del que no pica",
          additional: [
            {
              name: "Coquita de vidrio",
              price: 25,
              available: true,
              uuid: "0e41badf-8d49-42f3-b6e6-7dd2a6a2831d",
            },
          ],
          uuid: "955287fe-1b7f-4d6b-b9fe-6193e920ed7e",
        },
      ],
      total: 363,
      subtotal: 330,
      tip: 33,
      payment: "credit_card",
      expiration_date: "02-05-2025",
      address1: "Calle 85",
      address2: "NUm 123",
    };
    jest.spyOn(mockRepo, "create").mockResolvedValue({
      ...mockOrder,
      uuid: "12345",
    });
    // act
    const result = await service.create(mockOrder);
    // assert
    expect(result).toBeDefined();
    expect(result.products).toBeDefined();
    expect(result.total).toBeDefined();
    expect(result.subtotal).toBeDefined();
    expect(result.tip).toBeDefined();
    expect(result.payment).toBeDefined();
    expect(result.expiration_date).toBeDefined();
    expect(result.address1).toBeDefined();
    expect(result.address2).toBeDefined();
  });
  it("should validate an order", async () => {
    // arrange
    const mockRepo = new MockProductRepository();
    const service = new OrderService(new MockOrderRepository(), mockRepo);
    const mockOrder: OrderValidation = {
      ids: ["12345"],
      additional_ids: ["63963"],
      tips: 0.1,
    };
    jest.spyOn(mockRepo, "findManyProductsWithAdditional").mockResolvedValue([
      {
        uuid: "12345",
        name: "Salsa roja",
        price: 150,
        category: "main_course",
        notes: "Con el chile del que no pica",
        additional: [
          {
            name: "Salsa verde",
            price: 5,
            available: true,
            uuid: "63963",
          },
        ],
      },
    ]);
    // act
    const result = await service.validateOrder(mockOrder);

    // assert
    expect(result).toBeDefined();
    expect(result.products).toBeDefined();
    expect(result.total).toEqual(170.5);
    expect(result.subtotal).toEqual(155);
    expect(result.tip).toEqual(15.5);
  });
});
