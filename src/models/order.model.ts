import { ORDER_STATUS } from "@/shared/enums";
import { Schema, model } from "mongoose";
import { Product } from "./product.model";

const OrderSchema = new Schema(
  {
    uuid: {
      type: String,
      required: [true, "Missing uuid"],
      unique: true,
      index: true,
    },
    restaurant_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    products: [Product],
    total: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    tip: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ORDER_STATUS,
      default: ORDER_STATUS.WORKING,
    },
    delivery_address1: {
      type: String,
      required: true,
    },
    delivery_address2: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", OrderSchema);
