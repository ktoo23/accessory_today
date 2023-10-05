import Products from "../db/models/productModel.js";

class ProductService{

    async getProducts(category){

        let products ={}

        if(!category){ //카테고리 값이 없을시 전체 출력
            products = await Products.find({});
        }

        else{ //카테고리 값이 있을시 그 카테고리만 출력
            products = await Products.find({category:category});
        }
        
        const data = products.map(item=>{ //필요한 데이터만 출력하게 변환
            return { 
                _id:item._id,
                productName:item.productName,
                price:item.price,
                productImg:item.productImg
    }})

        return data;
    }

    async searchProducts(word){
        
        const products = await Products.find({productName:{$regex:new RegExp(word, 'i')}});//단어가 포함되어 있기만 해도 찾을 수 있다. 

        const data = products.map(item=>{ //필요한 데이터만 출력하게 변환
            return {
                _id:item._id,
                productName:item.productName,
                price:item.price,
                productImg:item.productImg
    }})
        return data;
    }

    async getDetail(Id){
        const product = await Products.findById(Id); //id로 찾기
        return product;
    }
}

const productService = new ProductService();
export {productService};