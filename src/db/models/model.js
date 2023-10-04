import mongoose from "mongoose";
import { productSchema } from "../schemas/productSchema.js";

exports.Porducts=mongoose.model("Products", productSchema);