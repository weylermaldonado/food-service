import { AUTH } from "@/infrastructure/config";
import { USER_ROLE } from "@/shared/enums";
import { randomUUID, createHash } from "crypto";

export class UserDTO {
  constructor(
    private email: string,
    private password: string,
    private restaurantId: string | null,
    private role: USER_ROLE,
    private name: string,
    private active: boolean = true,
    private uuid?: string
  ) {}

  getName() {
    return this.name;
  }

  setRole(role: USER_ROLE) {
    this.role = role;
  }

  setRestaurantId(id: string) {
    this.restaurantId = id;
  }

  getEmail(): string {
    return this.email;
  }
  generateID() {
    this.uuid = randomUUID();
  }
  getID(): string {
    return this.uuid!;
  }

  getRole(): string {
    return this.role;
  }

  getPassword() {
    return this.password;
  }

  async hashPassword(plainPassword: string): Promise<void> {
    this.password = await createHash("sha256")
      .update(`${plainPassword}.${AUTH.salt}`)
      .digest("hex");
  }

  async passwordMatch(hash: string, password: string): Promise<boolean> {
    await this.hashPassword(password);
    return hash === this.password;
  }

  toPrimitive(): Object {
    return {
      uuid: this.uuid,
      email: this.email,
      password: this.password,
      restaurant_id: this.restaurantId,
      user_role: this.role,
      name: this.name,
      active: this.active,
    };
  }

  static from(data: any): UserDTO {
    return new UserDTO(
      data.email,
      data.password,
      data.restaurant_id,
      data.user_role,
      data.name,
      data.active,
      data.uuid
    );
  }
}
