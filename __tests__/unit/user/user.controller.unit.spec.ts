import "reflect-metadata";
import { UserController } from "../../../src/controllers/user.controller";
import { SharedBootstrap } from "../../../src/infrastructure/bootstrap";
import { MockLogger } from "../../mocks/logger.mock";
import { MockUserService } from "../../mocks/user.service.mock";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { USER_ROLE } from "../../../src/shared/enums";

describe("user-controller-use-cases", () => {
  const { res, next, mockClear } = getMockRes();
  beforeAll(() => {
    new SharedBootstrap().initTest();
  });
  beforeEach(() => {
    mockClear();
  });

  it("should create an user successfully", async () => {
    // Arrange
    const mockService = new MockUserService();
    const userController = new UserController(mockService, new MockLogger());
    const req = getMockReq({
      body: {
        email: "maldonado.weyler3@gmail.com",
        password: "taquitos123",
        name: "Weyler Maldonado",
      },
      payload: {},
    });
    jest.spyOn(mockService, "create").mockResolvedValue({});
    // Act
    await userController.create(req, res, next);

    // Assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { message: "User created" },
        statusCode: 201,
        success: true,
      })
    );
  });
  it("should fail login when password doesnt match", async () => {
    // Arrange
    const mockService = new MockUserService();
    const userController = new UserController(mockService, new MockLogger());
    const req = getMockReq({
      body: {
        email: "maldonado.weyler3@gmail.com",
        password: "taquitos123",
      },
      payload: {},
    });
    jest.spyOn(mockService, "getByEmail").mockResolvedValue({});
    jest.spyOn(mockService, "generateToken").mockReturnValue("12345");
    // Act
    await userController.get(req, res, next).catch(console.error);

    // Assert
    expect(next).toHaveBeenCalled();
  });
  it("should login an existent user", async () => {
    // Arrange
    const mockService = new MockUserService();
    const userController = new UserController(mockService, new MockLogger());
    const req = getMockReq({
      body: {
        email: "maldonado.weyler3@gmail.com",
        password: "taquitos123",
      },
      payload: {},
    });
    jest.spyOn(mockService, "getByEmail").mockResolvedValue({
      password:
        "400725b50bcb9b47c1d41ba0d2dbcc19ef8b7cba3f71393a1ae9b7b696a2da2b",
      uuid: "123456",
      user_role: USER_ROLE.VISITOR,
    });
    jest.spyOn(mockService, "generateToken").mockReturnValue("12345");
    // Act
    await userController.get(req, res, next).catch(console.error);

    // Assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { token: "12345" },
        pagination: undefined,
        requestId: undefined,
        statusCode: 200,
        success: true,
      })
    );
  });
  it("should update an existent user", async () => {
    // Arrange
    const mockService = new MockUserService();
    const userController = new UserController(mockService, new MockLogger());
    const req = getMockReq({
      body: {
        active: false,
      },
      payload: {},
    });
    jest.spyOn(mockService, "update").mockResolvedValue({});
    // Act
    await userController.update(req, res, next);

    // Assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { message: "User deactivated" },
        pagination: undefined,
        requestId: undefined,
        statusCode: 200,
        success: true,
      })
    );
  });
  it("should fail updating an existent user if not exists", async () => {
    // Arrange
    const mockService = new MockUserService();
    const userController = new UserController(mockService, new MockLogger());
    const req = getMockReq({
      body: {
        active: false,
      },
      payload: {},
    });
    jest.spyOn(mockService, "update").mockResolvedValue(null);
    // Act
    await userController.update(req, res, next);

    // Assert
    expect(next).toHaveBeenCalled();
  });
  it("should create a super user", async () => {
    // Arrange
    const mockService = new MockUserService();
    const userController = new UserController(mockService, new MockLogger());
    const req = getMockReq({
      body: {
        email: "maldonado.weyler3@gmail.com",
        password: "taquitos123",
        name: "Weyler Admin",
      },
      payload: {},
    });
    jest.spyOn(mockService, "create").mockResolvedValue({});
    // Act
    await userController.createSuperUser(req, res, next).catch(console.error);

    // Assert
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { message: "SuperUser created" },
        pagination: undefined,
        requestId: undefined,
        statusCode: 200,
        success: true,
      })
    );
  });
});
