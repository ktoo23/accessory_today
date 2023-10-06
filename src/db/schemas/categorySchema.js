import { Schema } from "mongoose";

export const CategorySchema = new Schema({
  Category: { type: String, required: true },
});
