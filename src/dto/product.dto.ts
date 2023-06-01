import { PRODUCT_CATEGORIES } from "@/shared/enums";
import { randomUUID } from "crypto";

export class AdditionalDTO {
  constructor(
    private name: string,
    private price: number,
    private available?: boolean,
    private uuid?: string
  ) {
    if (price) this.validatePrice();
    if (name) this.validateName();
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

  toPrimitive() {
    return {
      uuid: this.uuid,
      price: this.price,
      available: this.available,
      name: this.name,
    };
  }

  pruneFields() {
    const obj = Object.fromEntries(
      Object.entries(this.toPrimitive()).filter(([_, v]) => v)
    );
    if ("available" in this) obj.available = this.available;
    return obj;
  }

  static from(data: any) {
    return new AdditionalDTO(
      data.name,
      data.price,
      data.availability || data.available,
      data.uuid
    );
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
          modifier.uuid ? modifier.uuid : additional.generateID();
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
