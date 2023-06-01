const TYPES = {
  Router: Symbol.for("Router"),
  Controller: Symbol.for("Controller"),
  Service: Symbol.for("Service"),
  Repository: Symbol.for("Repository"),
  Model: Symbol.for("Model"),

  // User
  UserController: Symbol.for("UserController"),
  User: Symbol.for("User"),

  // Restaurant
  Restaurant: Symbol.for("Restaurant"),
  RestaurantController: Symbol.for("RestaurantController"),
  RestaurantService: Symbol.for("RestaurantService"),
  RestaurantRepository: Symbol.for("RestaurantRepository"),

  // Product
  Product: Symbol.for("Product"),
  ProductController: Symbol.for("ProductController"),
  ProductService: Symbol.for("ProductService"),
  ProductRepository: Symbol.for("ProductRepository"),

  // Order
  Order: Symbol.for("Order"),
  OrderController: Symbol.for("OrderController"),
  OrderService: Symbol.for("OrderService"),
  OrderRepository: Symbol.for("OrderRepository"),

  // JWT
  JWT: Symbol.for("JWT"),
};

export { TYPES };
