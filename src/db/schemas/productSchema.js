import {Schema} from "mongoose";
const productSchema = new Schema({
    name:{type:String,required:true},
})

export default productSchema;