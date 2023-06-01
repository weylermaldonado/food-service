import { Literal, Record, String, Union, Boolean } from "runtypes";

export const CreateRestaurantRequest = Record({
  address: String,
  name: String,
  opening_time: String,
  closing_time: String,
});
