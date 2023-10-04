import { productsData } from "../db/testdata.js";

class ProductService{
    findCategory(category){
        if(!category){
            return productsData;
        }
        const products=productsData.filter(item=>item.category===category);
        return products;
    }

    searchProduct(word){
        const products = productsData.filter(item=>item.name.includes(word));
        return products;
    }
}
const productService = new ProductService();
export {productService};