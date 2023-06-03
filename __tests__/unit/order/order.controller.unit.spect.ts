import { SharedBootstrap } from "../../../src/infrastructure/bootstrap";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { OrderController } from "../../../src/controllers/order.controller";
import { MockOrderService } from "../../mocks/order.service.mock";
import { MockLogger } from "../../mocks/logger.mock";

describe("order-controller-use-case", () => {
  const { res, next, mockClear } = getMockRes();
  beforeAll(() => {
    new SharedBootstrap().initTest();
  });
  beforeEach(() => {
    mockClear();
  });
  it("should create an order", async () => {
    //arrange
    const mockService = new MockOrderService();
    const controller = new OrderController(mockService, new MockLogger());
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
    const req = getMockReq({
      payload: {
        uuid: "111111111",
      },
      body: mockOrder,
    });
    jest.spyOn(mockService, "create").mockResolvedValue({
      ...mockOrder,
      uuid: "333333",
      status: "working",
      user_id: "111111111",
    });
    // act
    await controller.create(req, res, next);
    // assert
    expect(res.send).toHaveBeenCalledWith({
      data: {
        delivery_address1: "Calle 85",
        delivery_address2: "NUm 123",
        payment_method: undefined,
        products: [
          {
            additional: [
              {
                available: true,
                name: "Salsa verde",
                price: 5,
                uuid: "24fd6a84-f683-4688-b5ca-831b7b41638c",
              },
            ],
            category: "main_course",
            name: "Salsa roja",
            notes: "Con el chile del que no pica",
            price: 150,
            uuid: "66f46a95-c91d-4f9c-bb29-40570824c7a2",
          },
          {
            additional: [
              {
                available: true,
                name: "Coquita de vidrio",
                price: 25,
                uuid: "0e41badf-8d49-42f3-b6e6-7dd2a6a2831d",
              },
            ],
            category: "main_course",
            name: "Chiles Rellenos",
            notes: "Con el chile del que no pica",
            price: 150,
            uuid: "955287fe-1b7f-4d6b-b9fe-6193e920ed7e",
          },
        ],
        status: "working",
        subtotal: 330,
        tip: 33,
        total: 363,
        user_id: undefined,
        uuid: "333333",
      },
      pagination: undefined,
      requestId: undefined,
      statusCode: 201,
      success: true,
    });
  });
  it("should cancel an order", async () => {
    //arrange
    const mockService = new MockOrderService();
    const controller = new OrderController(mockService, new MockLogger());
    const req = getMockReq({
      payload: {
        uuid: "12345",
      },
      params: {
        orderId: "111111111",
      },
    });
    jest.spyOn(mockService, "cancelOrder").mockResolvedValue({});
    // act
    await controller.update(req, res, next);
    // assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          message: "Order cancelled",
        },
        pagination: undefined,
        requestId: undefined,
        statusCode: 200,
        success: true,
      })
    );
  });
  it("should validate an order", async () => {
    //arrange
    const mockService = new MockOrderService();
    const controller = new OrderController(mockService, new MockLogger());
    const req = getMockReq({
      payload: {
        uuid: "12345",
      },
      body: {
        products: {
          ids: ["66f46a95-c91d-4f9c-bb29-40570824c7a2"],
          additional_ids: ["0e41badf-8d49-42f3-b6e6-7dd2a6a2831d"],
        },
        tip: 0.1,
      },
    });
    jest.spyOn(mockService, "validateOrder").mockResolvedValue({
      products: [
        {
          uuid: "66f46a95-c91d-4f9c-bb29-40570824c7a2",
          name: "Chiles Rellenos",
          price: 150,
          category: "main_course",
          notes: "Con el chile del que no pica",
          availability: true,
          additional: [
            {
              uuid: "0e41badf-8d49-42f3-b6e6-7dd2a6a2831d",
              name: "Coquita de vidrio",
              price: 25,
              availability: true,
            },
          ],
        },
      ],
      total: 100,
      subtotal: 90,
      tip: 10,
    });
    // act
    await controller.validateOrder(req, res, next);
    // assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          products: [
            {
              additional: [
                {
                  available: true,
                  name: "Coquita de vidrio",
                  price: 25,
                  uuid: "0e41badf-8d49-42f3-b6e6-7dd2a6a2831d",
                },
              ],
              available: true,
              category: "main_course",
              name: "Chiles Rellenos",
              notes: "Con el chile del que no pica",
              price: 150,
              uuid: "66f46a95-c91d-4f9c-bb29-40570824c7a2",
            },
          ],
          subtotal: 90,
          tip: 10,
          total: 100,
        },
        pagination: undefined,
        requestId: undefined,
        statusCode: 200,
        success: true,
      })
    );
  });
});
