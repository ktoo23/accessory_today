import { productsData } from "../db/testdata.js";

class ProductService{
    getProducts(category){
        if(!category){
            return productsData;
        }
        const products=productsData.filter(item=>item.category===category);
        return products;
    }

    searchProducts(word){
        const products = productsData.filter(item=>item.productName.includes(word));
        return products;
    }
}
const productService = new ProductService();
export {productService};