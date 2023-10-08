import { Schema } from "mongoose";

export const CategorySchema = new Schema({
  category: { type: String, required: true },
});
