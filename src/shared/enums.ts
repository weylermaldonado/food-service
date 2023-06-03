export enum USER_ROLE {
  VISITOR = "visitor",
  SUPER_ADMIN = "superadmin",
}

export enum ORDER_STATUS {
  WORKING = "working",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum PRODUCT_CATEGORIES {
  SNACK = "snack",
  MAIN_COURSE = "main_course",
  DESSERT = "dessert",
  DRINK = "drink",
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  METHOD_NOT_ALLOWED = 405,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER = 500,
}

export enum TIPS_PERCENTAGE {
  FIFTEEN_PERCENT = 0.15,
  TEN_PERCENT = 0.1,
  FIVE_PERCENT = 0.05,
  NONE = 0,
}

export enum PAYMENT_TYPES {
  UPON_DELIVERY = "upon_delivery",
  CREDIT_CARD = "credit_card",
}

// 24HRS Format
export enum SERVICE_WINDOW {
  OPEN_HOUR = 10,
  CLOSE_HOUR = 19,
}
