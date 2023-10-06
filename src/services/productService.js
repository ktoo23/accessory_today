import {Products} from "../db/models/productModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId; //ObjectId 형식으로 변환

function changeData(products){ //필요한 데이터만 출력하게 변환
    return products.map(item=>{ 
        return { 
            _id:item._id,
            productName:item.productName,
            price:item.price,
            productImg:item.productImg
    }});
}
class ProductService{
    
    async getProducts(category,word){ //제품 목록 출력
        try{
        

            let products =await Products.find({});

            if (category){ //카테고리 검색
                products = products.filter(item=>item.category===category);
            }
            if (word){ //상품명 검색
                products = products.filter(item=>item.productName.includes(word));
            }
            
            const productsData = changeData(products);

            return {
                status:200,
                message:'해당 상품 목록입니다.',
                products:productsData
            };
        }catch(error){
            console.error('getProducts 오류:',error);
            return{
                status:500,
                message:"서버에서 상품 목록을 가져오는 중에 오류가 발생했습니다."
            }
        }
    }

    async getDetail(Id){ //제품의 상세 내용 출력
        try{
            const targetId = new ObjectId(Id);//ObjectId형태로 변환
            const product = await Products.findById(targetId); //id로 찾기
            
            if (!product) {
                return {
                  status: 404, // 찾을 수 없음
                  message: '상품을 찾을 수 없습니다.'
                };
              }

            return {
                status:200,
                message:'상품의 상세 페이지입니다.',
                product:product
            };
        }catch(error){
            console.error('getDetail 오류:',error);
            return{
                status:500,
                message:"서버에서 상품 상세 목록을 가져오는 중에 오류가 발생했습니다."
            }
        }
    }
}

class HomeService{   //홈페이지에서 신상품과 Best상품 출력
    async getBest(){ //Best 상품 출력
        const products = await Products.find({isBest:true}).limit(4)
        const bestData = changeData(products);
        return bestData
    }
    async getNew(){ // 신상품 출력
        const products = await Products.find({isNew:true}).limit(4)
        const newData = changeData(products);
        return newData
    }
}


const homeService= new HomeService();
const productService = new ProductService();
export {productService,homeService};