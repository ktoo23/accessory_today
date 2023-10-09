import mongoose from "mongoose";
import { orderSchema } from "../schemas/orderSchema.js";

export const Order = mongoose.model("Order", orderSchema);
