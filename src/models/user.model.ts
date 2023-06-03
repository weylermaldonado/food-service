import { USER_ROLE } from "@/shared/enums";
import { Schema, model } from "mongoose";
const UserSchema = new Schema(
  {
    uuid: {
      type: String,
      required: [true, "Missing email"],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Missing email"],
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_role: {
      type: String,
      enum: USER_ROLE,
    },
    name: { type: String, required: true },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

UserSchema.path("email").validate(function (email: string) {
  const emailRegex = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email); // Assuming email has a text attribute
}, "The e-mail field cannot be empty or with out email structure.");

export const User = model("User", UserSchema);
