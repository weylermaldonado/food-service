import { Array, Literal, Number, Record, String, Union } from "runtypes";
import {
  PAYMENT_TYPES,
  PRODUCT_CATEGORIES,
  TIPS_PERCENTAGE,
} from "@/shared/enums";
import dayjs from "dayjs";

const tdcRegex =
  /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/;

const TIPS_ALLOWED = Union(
  Literal(TIPS_PERCENTAGE.FIFTEEN_PERCENT),
  Literal(TIPS_PERCENTAGE.TEN_PERCENT),
  Literal(TIPS_PERCENTAGE.FIVE_PERCENT),
  Literal(TIPS_PERCENTAGE.NONE)
);

const PAYMENT_METHODS = Union(
  Literal(PAYMENT_TYPES.CREDIT_CARD),
  Literal(PAYMENT_TYPES.UPON_DELIVERY)
);

const CATEGORIES = Union(
  Literal(PRODUCT_CATEGORIES.DESSERT),
  Literal(PRODUCT_CATEGORIES.DRINK),
  Literal(PRODUCT_CATEGORIES.MAIN_COURSE),
  Literal(PRODUCT_CATEGORIES.SNACK)
);

const ProductsValidationOrderRequest = Record({
  ids: Array(String),
  additional_ids: Array(String),
});
export const ValidateOrderRequest = Record({
  products: ProductsValidationOrderRequest,
  tip: TIPS_ALLOWED,
});

const AdditionalOrderRequest = Record({
  name: String.withConstraint((n) => n.length <= 40, {
    name: "Maximum 40 chars per additional name",
  }),
  price: Number.withConstraint((n) => n >= 0, {
    name: "Additional Price should be grater or equal than 0",
  }),
  uuid: String,
});

const ProductOrderRequest = Record({
  name: String.withConstraint((n) => n.length <= 40, {
    name: "Maximum 40 chars per Product name",
  }),
  price: Number.withConstraint((n) => n >= 0, {
    name: "Product Price should be grater or equal than 0",
  }),
  category: CATEGORIES,
  notes: String.withConstraint((n) => n.length <= 80, {
    name: "Maximum 80 chars per Product note",
  }),
  img: String.optional(),
  uuid: String,
  additional: Array(AdditionalOrderRequest),
});

export const CreateOrderRequest = Record({
  products: Array(ProductOrderRequest),
  total: Number.withConstraint((n) => n > 0, {
    name: "Total should be grater than zero.",
  }),
  subtotal: Number.withConstraint((n) => n > 0, {
    name: "Subtotal should be grater than zero.",
  }),
  tip: Number,
  payment: PAYMENT_METHODS,
  address1: String.withConstraint((n) => n.length <= 80, {
    name: "Max 80 chars for address1",
  }),
  address2: String.withConstraint((n) => n.length <= 80, {
    name: "Max 80 chars for address2",
  }),
  card_number: String.withConstraint((n) => tdcRegex.test(n), {
    name: "Invalid card number",
  }).optional(),
  expiration_date: String.withConstraint(
    (n) => {
      const isExpired = dayjs(n).diff(new Date(), "days") > 0;

      return dayjs(n).isValid() && isExpired;
    },
    {
      name: "Card expired o date malformed",
    }
  ).optional(),
});
