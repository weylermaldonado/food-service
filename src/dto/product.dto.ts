import { PRODUCT_CATEGORIES } from "@/shared/enums";
import { randomUUID } from "crypto";

class AdditionalDTO {
  constructor(
    private name: string,
    private price: number,
    private available: boolean = true,
    private uuid?: string
  ) {
    this.validatePrice();
    this.validateName();
  }

  private validateName() {
    if (this.name.length > 40) {
      throw new Error("Maximum 40 chars per name");
    }
  }
  private validatePrice() {
    if (this.price < 0) {
      throw new Error("Price must be grater or equal to zero.");
    }
  }
  generateID() {
    this.uuid = randomUUID();
  }
  getID(): string {
    return this.uuid!;
  }

  static from(data: any) {
    return new AdditionalDTO(data.name, data.price, data.availability);
  }
}

export class ProductDTO {
  constructor(
    private name: string,
    private price: number,
    private category: PRODUCT_CATEGORIES,
    private notes: string,
    private additional?: AdditionalDTO[],
    private available?: boolean,
    private uuid?: string
  ) {}

  generateID() {
    this.uuid = randomUUID();
  }
  getID(): string {
    return this.uuid!;
  }

  addAdditional(additional: AdditionalDTO) {
    this.additional?.push(additional);
  }

  toPrimitive(): Object {
    return {
      uuid: this.uuid,
      price: this.price,
      name: this.name,
      category: this.category,
      notes: this.notes,
      additional: this.additional,
      available: this.available,
    };
  }

  static from(data: any): ProductDTO {
    const additionals = data.additional
      ? data.additional.map((modifier: any) => {
          const additional = AdditionalDTO.from(modifier);
          additional.generateID();
          return additional;
        })
      : [];

    return new ProductDTO(
      data.name,
      data.price,
      data.category,
      data.notes,
      additionals,
      data.availability,
      data.uuid
    );
  }

  pruneFields() {
    const obj = Object.fromEntries(
      Object.entries(this.toPrimitive()).filter(([_, v]) => v)
    );
    if ("additional" in obj && !obj.additional.length) delete obj.additional;
    return obj;
  }
}
