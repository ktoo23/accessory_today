import {Products} from "../db/models/productModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

class ProductService{

    async getProducts(category,word){

        let products =await Products.find({});

        if (category){ //카테고리 검색
            products = products.filter(item=>item.category===category);
        }
        if (word){ //상품명 검색
            products = products.filter(item=>item.productName.includes(word));

        }
        
        const changedData = products.map(item=>{ //필요한 데이터만 출력하게 변환
            return { 
                _id:item._id,
                productName:item.productName,
                price:item.price,
                productImg:item.productImg
    }})

        return {
            status:200,
            message:'해당 상품 목록입니다.',
            products:changedData
        };
    }


    async getDetail(Id){
        const targetId = new ObjectId(Id);//ObjectId형태로 변환
        const product = await Products.findById(targetId); //id로 찾기
        return {
            status:200,
            message:'상품의 상세 페이지입니다.',
            product:product
        };
    }
}

const productService = new ProductService();
export {productService};