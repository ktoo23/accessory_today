import { Schema } from "mongoose";

export const orderSchema = new Schema({
  deliveryStatus: { type: String, required: true, default: "주문 완료" },
  orderProducts: [
    {
      products: {
        type: Schema.Types.ObjectId,
        ref: "Products",
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
  orderAddress: { type: String, required: true },
  orderPhone: { type: String, required: true },
  paidThrough: { type: String, required: true },
});
