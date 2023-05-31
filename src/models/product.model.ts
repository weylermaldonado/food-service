import { ORDER_CATEGORIES } from "@/shared/enums";
import { Schema, model } from "mongoose";

const AdditionalSchema = new Schema(
  {
    uuid: {
      type: String,
      required: [true, "Missing uuid"],
      unique: true,
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

export const ProductSchema = new Schema(
  {
    uuid: {
      type: String,
      required: [true, "Missing uuid"],
      unique: true,
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
    category: {
      type: String,
      enum: ORDER_CATEGORIES,
    },
    notes: {
      type: String,
    },
    available: {
      type: Boolean,
      required: true,
    },
    additional: [AdditionalSchema],
  },
  { timestamps: true }
);

export const Product = model("Product", ProductSchema);
