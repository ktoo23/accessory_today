import mongoose, { model } from "mongoose";
import { productSchema } from "../schemas/productSchema.js";
import { reviewSchema } from "../schemas/reviewSchema.js";


const Products =mongoose.model("Products", productSchema);
const Reviews =mongoose.model("Reviews", reviewSchema);
export {Products,Reviews};

