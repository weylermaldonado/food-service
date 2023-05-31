import { Schema, model } from "mongoose";
const RestaurantSchema = new Schema(
  {
    uuid: {
      type: String,
      required: [true, "Missing uuid"],
      unique: true,
      index: true,
    },
    address: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    opening_time: {
      type: Date,
      required: true,
    },
    closing_time: {
      type: Date,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Restaurant = model("Restaurant", RestaurantSchema);
