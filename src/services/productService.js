import Products from "../db/models/productModel.js";

class ProductService{

    async getProducts(category){
        if(!category){
            return Products.find({});
        }
        const products=await Products.find({category:category});
        console.log(products)
        const data = products.map(item=>{
            return {
                _id:item._id,
                productName:item.productName,
                price:item.price,
                productImg:item.productImg
    }})
        return data;
    }

    async searchProducts(word){
        const products = await Products.find({productName:{$regex:new RegExp(word, 'i')}});
        const data = products.map(item=>{
            return {
                _id:item._id,
                productName:item.productName,
                price:item.price,
                productImg:item.productImg
    }})
        return data;
    }

    async getDetail(Id){
        const product = await Products.findById(Id);
        return product;
    }
}

const productService = new ProductService();
export {productService};