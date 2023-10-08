import mongoose from "mongoose";
import { CategorySchema } from "../schemas/categorySchema.js";

export const categoryModel = mongoose.model("category", CategorySchema);
