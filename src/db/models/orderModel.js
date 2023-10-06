import mongoose from "mongoose";
import { OrderSchema } from "../schemas/orderSchema.js";

export const Order = mongoose.model("Order", OrderSchema);
