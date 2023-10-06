import { Schema } from "mongoose";

export const OrderSchema = new Schema({
  deliveryStatus: { type: String, required: true },
  orderProducts: [
    {
      products: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      count: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: "User", default: null },
  orderer: { type: String, required: true },
  orderPassword: { type: String, default: null },
  email: { type: String, required: true },
  orderAddress: { type: Number, required: true },
  orderPhone: { type: Number, required: true },
  paidThrough: { type: Boolean, default: false },
  isCanceled: { type: Boolean, default: false },
});
