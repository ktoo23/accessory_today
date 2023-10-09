import { Schema } from "mongoose";
const inquirySchema = new Schema({
    productId:{type:Schema.Types.ObjectId,ref:'Products',required:true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
    comment:{type:Schema.Types.ObjectId,ref:'Comments'},
  },{ versionKey : false } );

export {inquirySchema};
