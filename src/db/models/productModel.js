import mongoose from "mongoose";
import { productSchema } from "../schemas/productSchema.js";
import { reviewSchema } from "../schemas/reviewSchema.js";
import { inquirySchema } from "../schemas/inquirySchema.js";

const Inquiries =mongoose.model("Inquiry", inquirySchema);
const Products =mongoose.model("Products", productSchema);
const Reviews =mongoose.model("Reviews", reviewSchema);

export {Products,Reviews,Inquiries};

