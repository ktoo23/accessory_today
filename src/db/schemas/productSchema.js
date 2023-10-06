import {Schema} from "mongoose";

const productSchema = new Schema({
    productName: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    description: {type: String, requird: true},
    // 신상품 여부
    isNew: {type: Boolean, required: true, default: false},
    // 베스트 상품 여부
    isBest: {type: Boolean, required: true, default: false},
    // 이미지 url
    productImg: {type: String, required: true},
})

export {productSchema};