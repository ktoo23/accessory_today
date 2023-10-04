import { productsData } from "../db/testdata.js";

class ProductService{
    searchProduct(word){
        const product = productsData.filter(user=>user.name.includes(word));
        return product;
    }
}
const productService = new ProductService();
export {productService};