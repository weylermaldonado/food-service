import {
  ORDER_STATUS,
  PAYMENT_TYPES,
  PRODUCT_CATEGORIES,
} from "@/shared/enums";
import { Schema, model } from "mongoose";

const AdditionalOrderSchema = new Schema(
  {
    uuid: {
      type: String,
      required: [true, "Missing uuid"],
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductOrderSchema = new Schema(
  {
    uuid: {
      type: String,
      required: [true, "Missing uuid"],

      index: true,
    },
    img: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
    },
    notes: {
      type: String,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    additional: [AdditionalOrderSchema],
  },
  { timestamps: true }
);

const OrderSchema = new Schema(
  {
    uuid: {
      type: String,
      required: [true, "Missing uuid"],
      unique: true,
      index: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    products: [ProductOrderSchema],
    payment_method: {
      type: String,
      enum: PAYMENT_TYPES,
    },
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
