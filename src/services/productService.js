import {Products} from "../db/models/productModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId; //ObjectId 형식으로 변환

class ProductService{
    
    async getProducts(category,word,isBest,isNew){ //제품 목록 출력
        try{
            
            const filter = {};

            if(isBest){
                filter.isBest=true;
            }

            if(isNew){
                filter.isNew=true;
            }

            if (category) {
                filter.category = category;
            }

            if (word) {
                filter.productName = { $regex: word, $options: 'i' }; // 'i' 옵션은 대소문자 구분 없이 검색
            }
            
            const products = await Products.find(filter);
            
            const productsData = products.map(item=>{
                return { 
                    _id:item._id,
                    productName:item.productName,
                    price:item.price,
                    productImg:item.productImg
                }
            });

            return productsData;
        }catch(error){
            console.error('getProducts 오류:',error);
            return error;
        }
    }

    async getDetail(Id){ //제품의 상세 내용 출력
        try{
            const product = await Products.findById(new ObjectId(Id)); //id로 찾기
            
            return product;

        }catch(error){
            console.error('getDetail 오류:',error);
            return {error:error.message};
        }
    }
}


const productService = new ProductService();
export {productService};