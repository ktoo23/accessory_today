import { Schema } from "mongoose";

export const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  isAdmin: { type: Boolean, default: false },
});
