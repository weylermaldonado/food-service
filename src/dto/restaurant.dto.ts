import { randomUUID } from "crypto";

export class RestaurantDTO {
  constructor(
    private address: string,
    private name: string,
    private opening_time: string,
    private closing_time: string,
    private active: boolean = true,
    private uuid?: string
  ) {}

  generateID() {
    this.uuid = randomUUID();
  }
  getID(): string {
    return this.uuid!;
  }

  toPrimitive(): Object {
    return {
      uuid: this.uuid,
      address: this.address,
      name: this.name,
      opening_time: this.opening_time,
      closing_time: this.closing_time,
      active: this.active,
    };
  }

  static from(data: any): RestaurantDTO {
    return new RestaurantDTO(
      data.address,
      data.name,
      data.opening_time,
      data.closing_time,
      data.active,
      data.uuid
    );
  }
}
