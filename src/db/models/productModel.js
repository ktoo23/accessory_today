import mongoose, { model } from "mongoose";
import { productSchema } from "../schemas/productSchema.js";

export default mongoose.model("Products", productSchema);
