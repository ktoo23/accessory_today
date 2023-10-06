import { Schema } from "mongoose";

export const orderSchema = new Schema({
  deliveryStatus: { type: String, required: true, default: "주문 완료" },
  orderProducts: [
    {
      products: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      count: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: "User", default: null },
  orderer: { type: String, required: true },
  orderPassword: { type: String },
  eamil: { type: String, required: true },
  orderAddress: { type: String, required: true },
  orderPhone: { type: Number, required: true },
  paidThrough: { type: String, required: true },
  isCanceled: { type: Boolean, default: false },
});
