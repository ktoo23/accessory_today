import { Schema } from "mongoose";
const reviewSchema = new Schema({
    productId:{type:Schema.Types.ObjectId,ref:'Products',required:true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
  });

export {reviewSchema};