import { SharedBootstrap } from "../../../src/infrastructure/bootstrap";
import UserService from "../../../src/services/user.service";
import { MockJWT } from "../../mocks/jwt.mock";
import { MockUserRepository } from "../../mocks/user.repository.mock";
import { UserDTO } from "../../../src/dto/user.dto";
import { USER_ROLE } from "../../../src/shared/enums";

describe("user-service-use-case", () => {
  beforeAll(() => {
    new SharedBootstrap().initTest();
  });

  it("should create a user successfully", async () => {
    // Arrange
    const mockUser = new UserDTO(
      "admin@gmail.com",
      "taquitos123",
      null,
      USER_ROLE.VISITOR,
      "Juan Perez"
    );
    mockUser.generateID();
    const mockRepository = new MockUserRepository();
    const userService = new UserService(mockRepository, new MockJWT());
    jest
      .spyOn(mockRepository, "create")
      .mockResolvedValue(mockUser.toPrimitive());
    // Act
    const result = await userService.create(mockUser.toPrimitive());

    // Assert
    expect(result).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.email).toEqual(mockUser.getEmail());
    expect(result.name).toBeDefined();
    expect(result.name).toEqual(mockUser.getName());
    expect(result.password).toBeDefined();
    expect(result.password).toEqual(mockUser.getPassword());
    expect(result.user_role).toBeDefined();
    expect(result.user_role).toEqual(USER_ROLE.VISITOR);
    expect(result.uuid).toBeDefined();
    expect(typeof result.uuid).toEqual("string");
  });
  it("should generate a token successfully", async () => {
    // Arrange
    const mockUser = new UserDTO(
      "admin@gmail.com",
      "taquitos123",
      null,
      USER_ROLE.VISITOR,
      "Juan Perez"
    );
    mockUser.generateID();
    const mockJWT = new MockJWT();
    const userService = new UserService(new MockUserRepository(), mockJWT);

    // Act
    const result = await userService.generateToken(
      mockUser.getID(),
      mockUser.getRole()
    );

    // Assert
    expect(result).toBeDefined();
  });
  it("should get an user by uuid", async () => {
    // Arrange
    const mockUser = new UserDTO(
      "admin@gmail.com",
      "taquitos123",
      null,
      USER_ROLE.VISITOR,
      "Juan Perez"
    );
    mockUser.generateID();
    const mockRepository = new MockUserRepository();
    const userService = new UserService(mockRepository, new MockJWT());
    jest
      .spyOn(mockRepository, "getByUUID")
      .mockResolvedValue(mockUser.toPrimitive());
    // Act
    const result = await userService.getByUUID(mockUser.getID());

    // Assert
    expect(result).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.email).toEqual(mockUser.getEmail());
    expect(result.name).toBeDefined();
    expect(result.name).toEqual(mockUser.getName());
    expect(result.password).toBeDefined();
    expect(result.password).toEqual(mockUser.getPassword());
    expect(result.user_role).toBeDefined();
    expect(result.user_role).toEqual(USER_ROLE.VISITOR);
    expect(result.uuid).toBeDefined();
    expect(typeof result.uuid).toEqual("string");
  });
  it("should get an user by email", async () => {
    // Arrange
    const mockUser = new UserDTO(
      "admin@gmail.com",
      "taquitos123",
      null,
      USER_ROLE.VISITOR,
      "Juan Perez"
    );
    mockUser.generateID();
    const mockRepository = new MockUserRepository();
    const userService = new UserService(mockRepository, new MockJWT());
    jest
      .spyOn(mockRepository, "getByEmail")
      .mockResolvedValue(mockUser.toPrimitive());
    // Act
    const result = await userService.getByEmail(mockUser.getEmail());

    // Assert
    expect(result).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.email).toEqual(mockUser.getEmail());
    expect(result.name).toBeDefined();
    expect(result.name).toEqual(mockUser.getName());
    expect(result.password).toBeDefined();
    expect(result.password).toEqual(mockUser.getPassword());
    expect(result.user_role).toBeDefined();
    expect(result.user_role).toEqual(USER_ROLE.VISITOR);
    expect(result.uuid).toBeDefined();
    expect(typeof result.uuid).toEqual("string");
  });
});
