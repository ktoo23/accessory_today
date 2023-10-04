import mongoose from "mongoose";
import { productSchema } from "../schemas/productSchema.js";

module.exports=mongoose.model("Products", productSchema);