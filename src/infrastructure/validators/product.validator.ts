import { PRODUCT_CATEGORIES } from "@/shared/enums";
import {
  Literal,
  Record,
  String,
  Union,
  Number,
  Boolean,
  Array,
} from "runtypes";

const CATEGORIES = Union(
  Literal(PRODUCT_CATEGORIES.DESSERT),
  Literal(PRODUCT_CATEGORIES.DRINK),
  Literal(PRODUCT_CATEGORIES.MAIN_COURSE),
  Literal(PRODUCT_CATEGORIES.SNACK)
);
export const CreateProductAdditionalRequest = Record({
  name: String.withConstraint((n) => n.length <= 40, {
    name: "Maximum 40 chars per additional name",
  }),
  price: Number.withConstraint((n) => n >= 0, {
    name: "Additional Price should be grater or equal than 0",
  }),
  availability: Boolean,
});

export const UpdateProductAdditionalRequest = Record({
  name: String.withConstraint((n) => n.length <= 40, {
    name: "Maximum 40 chars per additional name",
  }).optional(),
  price: Number.withConstraint((n) => n >= 0, {
    name: "Additional Price should be grater or equal than 0",
  }).optional(),
  availability: Boolean.optional(),
});
export const CreateProductRequest = Record({
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
  availability: Boolean,
  additional: Array(CreateProductAdditionalRequest),
});

export const FilterProductRequest = Record({
  filter: String.withConstraint((n) => n?.split(":").length! > 1, {
    name: "Filter format should be <prop>:<value>",
  }).optional(),
  sortBy: String.optional(),
  pageSize: String,
  pageNum: String,
});

export const UpdateProductRequest = Record({
  name: String.withConstraint((n) => n.length <= 40, {
    name: "Maximum 40 chars per Product name",
  }).optional(),
  price: Number.withConstraint((n) => n >= 0, {
    name: "Product Price should be grater or equal than 0",
  }).optional(),
  category: CATEGORIES.optional(),
  notes: String.withConstraint((n) => n.length <= 80, {
    name: "Maximum 80 chars per Product note",
  }).optional(),
  img: String.optional(),
  availability: Boolean.optional(),
});
