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
  user: { type: Schema.Types.ObjectId, default: null },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now() },
  orderer: { type: String, required: true },
  orderEmail: { type: String, required: true },
  orderPassword: { type: String, default: null },
  orderAddress: { type: Number, required: true },
  orderPhone: { type: Number, required: true },
  paidThrough: { type: Boolean, default: false },
  isCanceled: { type: Boolean, default: false },
});
