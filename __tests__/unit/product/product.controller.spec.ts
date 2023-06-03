import { SharedBootstrap } from "../../../src/infrastructure/bootstrap";
import { ProductController } from "../../../src/controllers/product.controller";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { MockLogger } from "../../mocks/logger.mock";
import { MockProductService } from "../../mocks/product.service.mock";

describe("product-controller-use-case", () => {
  const { res, next, mockClear } = getMockRes();
  beforeAll(() => {
    new SharedBootstrap().initTest();
  });
  beforeEach(() => {
    mockClear();
  });
  it("Get product list filtered", async () => {
    // arrange
    const mockService = new MockProductService();
    const controller = new ProductController(mockService, new MockLogger());
    const req = getMockReq({
      query: {
        filter: "category:main_course",
        pageSize: "10",
        pageNum: "1",
        sortBy: "price",
      },
    });
    jest.spyOn(mockService, "getAll").mockResolvedValue([
      {
        uuid: "12345",
        name: "Chiles Rellenos",
        price: 150,
        category: "main_course",
        notes: "Con el chile del que no pica",
        availability: true,
        additional: [
          {
            uuid: "12345",
            name: "Coquita de vidrio",
            price: 25,
            availability: true,
          },
        ],
      },
    ]);
    jest.spyOn(mockService, "countWithFilter").mockResolvedValue(10);
    // act
    await controller.getAll(req, res, next);
    // assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [
          {
            additional: [
              {
                available: true,
                name: "Coquita de vidrio",
                price: 25,
                uuid: "12345",
              },
            ],
            available: true,
            category: "main_course",
            name: "Chiles Rellenos",
            notes: "Con el chile del que no pica",
            price: 150,
            uuid: "12345",
          },
        ],
        pagination: {
          page_number: 1,
          page_size: 10,
          page_total: 1,
          total_records: 10,
        },
        requestId: undefined,
        statusCode: 200,
        success: true,
      })
    );
  });
  it("Should update existent product", async () => {
    // arrange
    const mockService = new MockProductService();
    const controller = new ProductController(mockService, new MockLogger());
    const req = getMockReq({
      params: {
        productId: "12345",
      },
      body: {
        name: "updated name",
      },
    });
    jest.spyOn(mockService, "update").mockResolvedValue({
      uuid: "12345",
      name: "updated name",
      price: 150,
      category: "main_course",
      notes: "Con el chile del que no pica",
      availability: true,
      additional: [
        {
          uuid: "12345",
          name: "Coquita de vidrio",
          price: 25,
          availability: true,
        },
      ],
    });

    // act
    await controller.update(req, res, next);
    // assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          additional: [
            {
              available: true,
              name: "Coquita de vidrio",
              price: 25,
              uuid: "12345",
            },
          ],
          available: true,
          category: "main_course",
          name: "updated name",
          notes: "Con el chile del que no pica",
          price: 150,
          uuid: "12345",
        },
        pagination: undefined,
        requestId: undefined,
        statusCode: 200,
        success: true,
      })
    );
  });
  it("Should delete existent product", async () => {
    // arrange
    const mockService = new MockProductService();
    const controller = new ProductController(mockService, new MockLogger());
    const req = getMockReq({
      params: {
        productId: "12345",
      },
    });
    jest.spyOn(mockService, "delete").mockResolvedValue({});

    // act
    await controller.delete(req, res, next);
    // assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: "Product 12345 deleted successfully.",
        pagination: undefined,
        requestId: undefined,
        statusCode: 204,
        success: true,
      })
    );
  });
  it("Should create a product", async () => {
    // arrange
    const mockService = new MockProductService();
    const controller = new ProductController(mockService, new MockLogger());
    const req = getMockReq({
      body: {
        name: "Chiles Rellenos",
        price: 150,
        category: "main_course",
        notes: "Con el chile del que no pica",
        availability: true,
        additional: [
          {
            name: "Coquita de vidrio",
            price: 25,
            availability: true,
          },
        ],
      },
    });
    jest.spyOn(mockService, "create").mockResolvedValue({});

    // act
    await controller.create(req, res, next);
    // assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { message: "Product created" },
        pagination: undefined,
        requestId: undefined,
        statusCode: 201,
        success: true,
      })
    );
  });
  it("Should create a product additional", async () => {
    // arrange
    const mockService = new MockProductService();
    const controller = new ProductController(mockService, new MockLogger());
    const req = getMockReq({
      params: {
        productId: "12345",
      },
      body: {
        name: "Coquita de vidrio",
        price: 25,
        availability: true,
      },
    });
    jest.spyOn(mockService, "addProductAdditional").mockResolvedValue({});

    // act
    await controller.addProductAdditional(req, res, next);
    // assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { message: "Product additional created" },
        pagination: undefined,
        requestId: undefined,
        statusCode: 201,
        success: true,
      })
    );
  });
  it("Should update a product additional", async () => {
    // arrange
    const mockService = new MockProductService();
    const controller = new ProductController(mockService, new MockLogger());
    const req = getMockReq({
      params: {
        productId: "12345",
        additionalId: "6789",
      },
      body: {
        availability: false,
      },
    });
    jest.spyOn(mockService, "updateProductAdditional").mockResolvedValue({
      name: "Chiles Rellenos",
      price: 150,
      category: "main_course",
      notes: "Con el chile del que no pica",
      availability: true,
      additional: [
        {
          uuid: "6789",
          name: "Coquita de vidrio",
          price: 25,
          availability: true,
        },
      ],
    });

    // act
    await controller.updateProductAdditional(req, res, next);

    // assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          available: true,
          name: "Coquita de vidrio",
          price: 25,
          uuid: "6789",
        },
        pagination: undefined,
        requestId: undefined,
        statusCode: 200,
        success: true,
      })
    );
  });
  it("Should delete a product additional", async () => {
    // arrange
    const mockService = new MockProductService();
    const controller = new ProductController(mockService, new MockLogger());
    const req = getMockReq({
      params: {
        productId: "12345",
        additionalId: "6789",
      },
    });
    jest.spyOn(mockService, "deleteProductAdditional").mockResolvedValue({});

    // act
    await controller.deleteProductAdditional(req, res, next);

    // assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { message: "Product additional deleted" },
        pagination: undefined,
        requestId: undefined,
        statusCode: 204,
        success: true,
      })
    );
  });
});
