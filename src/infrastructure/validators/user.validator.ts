import { USER_ROLE } from "@/shared/enums";
import { Literal, Record, String, Union, Boolean } from "runtypes";

const UserRoles = Union(
  Literal(USER_ROLE.SUPER_ADMIN),
  Literal(USER_ROLE.VISITOR)
);

const EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const CreateUserRequest = Record({
  email: String.withConstraint((mail) => EMAIL_REGEX.test(mail), {
    name: "Email format",
  }),
  password: String.withConstraint((n) => n.length > 8, {
    name: "8 characters at least",
  }),
  restaurant_id: String.optional(),
  role: UserRoles.optional(),
  name: String,
});

export const LoginUserRequest = Record({
  email: String.withConstraint((mail) => EMAIL_REGEX.test(mail), {
    name: "Email format",
  }),
  password: String,
});

export const UpdateUserRequest = Record({
  active: Boolean,
});
