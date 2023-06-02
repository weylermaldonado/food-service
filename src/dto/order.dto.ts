import { PRODUCT_CATEGORIES } from "@/shared/enums";
import { randomUUID } from "crypto";

export class OrderDTO {
  constructor(
    private products: any[],
    private total: number,
    private subtotal: number,
    private tip: number,
    private payment_method: string,
    private address1: string,
    private address2: string,
    private userId?: string,
    private uuid?: string,
    private status?: string
  ) {}

  setUserId(id: string) {
    this.userId = id;
  }
  generateID() {
    this.uuid = randomUUID();
  }
  getID(): string {
    return this.uuid!;
  }

  toPrimitive() {
    return {
      uuid: this.uuid,
      total: this.total,
      subtotal: this.subtotal,
      products: this.products,
      tip: this.tip,
      payment_method: this.payment_method,
      user_id: this.userId,
      delivery_address1: this.address1,
      delivery_address2: this.address2,
      status: this.status,
    };
  }

  pruneFields() {
    const obj = Object.fromEntries(
      Object.entries(this.toPrimitive()).filter(([_, v]) => v)
    );
    return obj;
  }

  static from(data: any) {
    return new OrderDTO(
      data.products,
      data.total,
      data.subtotal,
      data.tip,
      data.payment_method,
      data.address1 || data.delivery_address1,
      data.address2 || data.delivery_address1,
      data.userId,
      data.uuid,
      data.status
    );
  }
}
