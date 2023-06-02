export type OrderValidation = {
  ids: string[];
  additional_ids: string[];
  tips: number;
};

export type OrderCost = {
  products: any[];
  total: number;
  subtotal: number;
  tip: number;
};
